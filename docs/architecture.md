# SmartReno Plugin — Architecture Specification

## 1. Introduction
SmartReno is a thin integration layer between homeowners and construction management platforms. This document outlines the technical architecture for the SmartReno Plugin, ensuring secure data synchronization and a seamless user experience.

---

## 2. Authentication & Security Flows

### 2.1 OAuth 2.0 (PKCE)
The plugin uses OAuth 2.0 with Proof Key for Code Exchange (PKCE) to integrate with providers (Buildertrend, Procore, etc.).
1. **Initiation**: User clicks "Connect [Provider]" in the SmartReno Dashboard.
2. **Redirect**: SmartReno redirects to the provider's auth endpoint with `code_challenge`.
3. **Authorization**: User approves access.
4. **Callback**: Provider redirects back to `/api/auth/[provider]/callback` with an `authorization_code`.
5. **Token Exchange**: SmartReno exchanges the code for `access_token` and `refresh_token` using the `code_verifier`.
6. **Storage**: Tokens are stored in a secure, encrypted vault (simulated in-memory for this prototype).

### 2.2 Webhook Security
All incoming webhooks must be verified to prevent spoofing.
- **Verification**: SmartReno validates the `X-Hub-Signature` (or equivalent) header.
- **Algorithm**: HMAC-SHA256 using a shared secret provided during integration setup.
- **Idempotency**: Every webhook event includes a unique `event_id` to prevent duplicate processing.

---

## 3. Data Schemas (Simplified)

### 3.1 Lead Object
```json
{
  "id": "sr_lead_123",
  "homeowner": {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "+15550101"
  },
  "project": {
    "type": "Kitchen Remodel",
    "description": "Full gut renovation of a 200sqft kitchen.",
    "address": "123 Maple St, Anytown, ST 12345"
  },
  "status": "intake_received",
  "external_ref": null
}
```

### 3.2 Appointment Object
```json
{
  "id": "sr_appt_456",
  "lead_id": "sr_lead_123",
  "estimator_id": "est_789",
  "start_time": "2026-04-10T10:00:00Z",
  "end_time": "2026-04-10T11:00:00Z",
  "status": "scheduled"
}
```

---

## 4. Error Matrix & Retry Logic

| Error Code | Category | Description | Retry Strategy |
|------------|----------|-------------|----------------|
| `AUTH_EXPIRED` | Auth | Access token expired. | Immediate refresh token exchange. |
| `RATE_LIMIT` | Provider | API rate limit exceeded. | Exponential backoff (start @ 5s). |
| `VALIDATION_ERR`| Logic | Data doesn't match provider schema. | Log error, notify Dev (No retry). |
| `PROVIDER_DOWN` | Network | Provider API is unreachable (5xx). | Exponential backoff (max 5 retries). |
| `CONFLICT` | Sync | Resource edited concurrently. | Fetch latest state, resolve, retry once. |

---

## 5. Adapter Interface Design

The `IProviderAdapter` ensures that the core application remains provider-agnostic. Adding a new provider simply requires implementing this interface:

```typescript
interface IProviderAdapter {
  createLead(lead: Lead): Promise<string>; // Returns external ID
  syncAppointment(appt: Appointment): Promise<void>;
  uploadFile(file: FileRef): Promise<string>; // Returns external URL
  verifyWebhook(payload: any, sig: string): boolean;
}
```

---

## 6. Advanced Questions (Technical Deep-Dive)

**1. Design adapter interfaces for multiple providers?**
Use a shared interface (`IProviderAdapter`) and an `AdapterFactory`. The factory instantiates the specific implementation based on the user's connected provider. Common logic (like retry wrappers) is handled by an `AbstractAdapter`.

**2. OAuth app registration and token handling?**
Register "SmartReno" apps in each provider's developer portal. Store `client_id` and `client_secret` in env vars. Use a background job for token refreshes 5 minutes before expiration to ensure zero downtime for sync.

**3. Resolve two-way update conflicts?**
Implement "Last Write Wins" with an optional "Semantic Merge". We store a `last_synced_at` timestamp. If a conflict occurs (409), we fetch the provider's current state and merge fields based on a hierarchy (e.g., Homeowner data always wins from SmartReno, Schedule usually wins from Buildertrend).

**4. Validate webhook signatures and handle retries?**
Compute HMAC-SHA256 of the raw body using the provider's secret and compare to the header. For retries: respond with `202 Accepted` immediately, queue the job, and if it fails, retry with exponential backoff.

**5. Manage secure file storage and expiring access?**
Files are stored in S3-compatible storage with private access. When syncing to a provider, we generate a **Presigned URL** with a 24-hour expiration.

**6. Changes as SmartReno scales from 1 → 200 markets?**
Transition from a monolith to a microservices architecture. Use a message broker (SQS/Kafka) for high-volume lead dispatch. Implement Geo-sharding for database performance and compliance (data residency).

**7. Handle provider API outages or compromised credentials?**
Circuit Breakers: Detect repeated 5xx errors and "open" the circuit, queuing all pending syncs. For compromised credentials, implement a global "Kill Switch" that invalidates all tokens for that provider and triggers a re-auth flow for all users.

**8. Steps to publish in one provider’s marketplace?**
(e.g., Procore) 1. Finalize OAuth flow. 2. Pass security audit (PCI/SOC2). 3. Create marketing collateral. 4. Submit for review. 5. Technical certification walkthrough.

**9. Event taxonomy for adoption analytics?**
`plugin_connected`, `lead_synced`, `appointment_scheduled`, `file_upload_success`, `sync_error_rate`, `time_to_first_lead`.

**10. Obstacles while building?**
API fragmentation (non-standardized schemas), restrictive rate limits, unreliable webhooks (lost events), and managing state consistency across distributed systems.

---

## 7. Build Timeline & Cadence

### Production-Ready Timeline: 6 Weeks
- **Weeks 1-2 (Sprint 1: Core Foundation)**: Auth, Adapter Infrastructure, Lead Sync.
- **Weeks 3-4 (Sprint 2: Deep Integration)**: Appointment Sync, File Uploads, Webhooks.
- **Weeks 5-6 (Sprint 3: Hardening)**: Error handling, UI polish, Marketplace compliance testing.

### Team Composition
- **1 Tech Lead**: Architecture & Security.
- **2 Full-Stack Developers**: API, UI, and Adapter implementations.
- **1 QA/DevOps**: CI/CD, Testing, and Compliance.

### Cadence
- **Daily**: Standups.
- **Weekly**: Demo to stakeholders.
- **Bi-Weekly**: Sprint planning & Retrospective.
