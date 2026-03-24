import fs from 'fs';
import path from 'path';
import { Lead, Appointment, FileRef, AuditEvent } from './schemas';

const DB_PATH = 'C:\\Users\\Dell\\Desktop\\smart-reno\\app\\db.json';

export class Store {
  private data: {
    leads: Record<string, Lead>;
    appointments: Record<string, Appointment>;
    files: Record<string, FileRef[]>;
    auditLogs: Record<string, AuditEvent[]>;
  } = { leads: {}, appointments: {}, files: {}, auditLogs: {} };

  constructor() {
    this.load();
  }

  private load() {
    if (fs.existsSync(DB_PATH)) {
      try {
        this.data = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
      } catch (e) {
        console.error('Failed to load DB', e);
      }
    }
  }

  private save() {
    fs.writeFileSync(DB_PATH, JSON.stringify(this.data, null, 2));
  }

  // Leads
  async saveLead(lead: Lead) {
    this.data.leads[lead.id] = lead;
    this.addAuditLog(lead.id, 'Intake received', JSON.stringify(lead.project));
    this.save();
  }

  async getLead(id: string) {
    return this.data.leads[id];
  }

  async getAllLeads() {
    return Object.values(this.data.leads);
  }

  async updateLeadStatus(id: string, status: Lead['status'], externalRef?: string) {
    const lead = this.data.leads[id];
    if (lead) {
      lead.status = status;
      if (externalRef) lead.externalRef = externalRef;
      this.data.leads[id] = lead;
      this.addAuditLog(id, `Status updated to ${status}`, externalRef ? `Ext Ref: ${externalRef}` : undefined);
      this.save();
    }
  }

  // Appointments
  async saveAppointment(appt: Appointment) {
    this.data.appointments[appt.id] = appt;
    this.addAuditLog(appt.leadId, 'Appointment scheduled', `${appt.startTime} - ${appt.endTime}`);
    this.save();
  }

  async getAppointmentsForLead(leadId: string) {
    return Object.values(this.data.appointments).filter(a => a.leadId === leadId);
  }

  // Files
  async saveFileRef(file: FileRef) {
    const leadFiles = this.data.files[file.leadId] || [];
    leadFiles.push(file);
    this.data.files[file.leadId] = leadFiles;
    this.addAuditLog(file.leadId, 'File uploaded', file.name);
    this.save();
  }

  async getFilesForLead(leadId: string) {
    return this.data.files[leadId] || [];
  }

  // Audit Logs
  addAuditLog(leadId: string, event: string, details?: string) {
    const logs = this.data.auditLogs[leadId] || [];
    logs.push({
      id: Math.random().toString(36).substring(7),
      leadId,
      timestamp: new Date().toISOString(),
      event,
      details,
      actor: 'system'
    });
    this.data.auditLogs[leadId] = logs;
    this.save();
  }

  async getAuditLogs(leadId: string) {
    return this.data.auditLogs[leadId] || [];
  }
}

export const globalStore = new Store();
