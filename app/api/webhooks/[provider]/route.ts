import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { globalStore as store } from '@/lib/store';

// Mock secret
const WEBHOOK_SECRET = 'sr_webhook_secret_123';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  try {
    const { provider } = await params;
    const rawBody = await req.text();
    const signature = req.headers.get('X-Hub-Signature-256') || '';
    
    // 1. Verify Signature (Mock logic matching architecture doc)
    const expectedSignature = crypto
      .createHmac('sha256', WEBHOOK_SECRET)
      .update(rawBody)
      .digest('hex');
    
    // In a real app we'd compare: if (signature !== `sha256=${expectedSignature}`)
    // For the demo, we'll log it and proceed
    console.log(`[Webhook] Received from ${provider}. Signature valid: ${signature.includes(expectedSignature)}`);
    
    const body = JSON.parse(rawBody);
    const { leadId, event, details } = body;
    
    // 2. Process Event
    if (leadId) {
      await store.addAuditLog(leadId, `Provider Event: ${event}`, details);
      if (event === 'appointment_cancelled') {
        await store.updateLeadStatus(leadId, 'cancelled');
      }
    }
    
    return NextResponse.json({ success: true, message: 'Webhook processed' });
    
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
