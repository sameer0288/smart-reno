import axios from 'axios';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const API_BASE = 'http://localhost:3000/api';

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'sync-lead': {
      const filePath = args[1];
      if (!filePath) {
        console.error('Usage: smartreno sync-lead <file.json> [--provider=procore]');
        process.exit(1);
      }
      const provider = args.find(a => a.startsWith('--provider='))?.split('=')[1] || 'buildertrend';
      
      const leadData = JSON.parse(fs.readFileSync(path.resolve(filePath), 'utf8'));
      try {
        const response = await axios.post(`${API_BASE}/intake?provider=${provider}`, leadData);
        console.log('✓ Lead Synced Successfully');
        console.log('  SmartReno ID:', response.data.leadId);
        console.log('  Provider Ref:', response.data.externalRef);
      } catch (error: any) {
        console.error('✗ Sync Failed:', error.response?.data?.error || error.message);
      }
      break;
    }

    case 'check-status': {
      const leadId = args[1];
      if (!leadId) {
        console.error('Usage: smartreno check-status <leadId>');
        process.exit(1);
      }
      try {
        const response = await axios.get(`${API_BASE}/status/${leadId}`);
        const { lead, history } = response.data;
        console.log(`\nLead: ${lead.homeowner.name} (${lead.status})`);
        console.log(`Project: ${lead.project.type}`);
        console.log(`\nAudit Log:`);
        history.forEach((log: any) => {
          console.log(`- [${log.timestamp}] ${log.event}: ${log.details || ''}`);
        });
      } catch (error: any) {
        console.error('✗ Status Check Failed:', error.response?.data?.error || error.message);
      }
      break;
    }

    case 'test-webhook': {
      const leadId = args[1];
      if (!leadId) {
        console.error('Usage: smartreno test-webhook <leadId> [--event=...]');
        process.exit(1);
      }
      const event = args.find(a => a.startsWith('--event='))?.split('=')[1] || 'appointment_scheduled';
      const provider = 'buildertrend';
      const secret = 'sr_webhook_secret_123';
      
      const payload = JSON.stringify({ leadId, event, details: 'Simulated from CLI' });
      const signature = crypto.createHmac('sha256', secret).update(payload).digest('hex');
      
      try {
        await axios.post(`${API_BASE}/webhooks/${provider}`, payload, {
          headers: { 
            'Content-Type': 'application/json',
            'X-Hub-Signature-256': `sha256=${signature}`
          }
        });
        console.log('✓ Webhook Sent & Verified');
      } catch (error: any) {
        console.error('✗ Webhook Failed:', error.response?.data?.error || error.message);
      }
      break;
    }

    default:
      console.log('SmartReno SDK CLI');
      console.log('Usage:');
      console.log('  smartreno sync-lead <file> [--provider=...]');
      console.log('  smartreno check-status <leadId>');
      console.log('  smartreno test-webhook <leadId> [--event=...]');
  }
}


main();
