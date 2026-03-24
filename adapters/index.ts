import { Lead, Appointment, FileRef } from '../lib/schemas';

export interface IProviderAdapter {
  name: string;
  createLead(lead: Lead): Promise<string>;
  createAppointment(appt: Appointment): Promise<string>;
  syncFile(file: FileRef): Promise<void>;
  verifyWebhook(payload: string, signature: string): boolean;
}

export class AdapterFactory {
  static getAdapter(provider: string): IProviderAdapter {
    switch (provider.toLowerCase()) {
      case 'buildertrend':
        return new BuildertrendAdapter();
      case 'procore':
        return new ProcoreAdapter();
      default:
        throw new Error(`Provider ${provider} not supported`);
    }
  }
}

// Mock Adapters (to be moved to separate files)
export class BuildertrendAdapter implements IProviderAdapter {
  name = 'Buildertrend';
  async createLead(lead: Lead) {
    console.log(`[Buildertrend] Creating lead for ${lead.homeowner.name}`);
    return `bt_lead_${Math.random().toString(36).substring(7)}`;
  }
  async createAppointment(appt: Appointment) {
    console.log(`[Buildertrend] Scheduling appointment for lead ${appt.leadId}`);
    return `bt_appt_${Math.random().toString(36).substring(7)}`;
  }
  async syncFile(file: FileRef) {
    console.log(`[Buildertrend] Syncing file ${file.name}`);
  }
  verifyWebhook(payload: string, signature: string) {
    return true; // Mock verification
  }
}

export class ProcoreAdapter implements IProviderAdapter {
  name = 'Procore';
  async createLead(lead: Lead) {
    console.log(`[Procore] Creating lead for ${lead.homeowner.name}`);
    return `pc_lead_${Math.random().toString(36).substring(7)}`;
  }
  async createAppointment(appt: Appointment) {
    console.log(`[Procore] Scheduling appointment for lead ${appt.leadId}`);
    return `pc_appt_${Math.random().toString(36).substring(7)}`;
  }
  async syncFile(file: FileRef) {
    console.log(`[Procore] Syncing file ${file.name}`);
  }
  verifyWebhook(payload: string, signature: string) {
    return true; // Mock verification
  }
}
