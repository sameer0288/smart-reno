import { z } from 'zod';

export const HomeownerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(10),
});

export const ProjectSchema = z.object({
  type: z.string().min(1),
  description: z.string().min(1),
  address: z.string().min(1),
  zip: z.string().min(5),
});

export const LeadSchema = z.object({
  id: z.string(),
  homeowner: HomeownerSchema,
  project: ProjectSchema,
  status: z.enum(['intake_received', 'synced', 'appointment_scheduled', 'cancelled', 'completed']),
  createdAt: z.string(),
  externalRef: z.string().optional(),
});

export const AppointmentSchema = z.object({
  id: z.string(),
  leadId: z.string(),
  estimatorId: z.string(),
  startTime: z.string(), // ISO String
  endTime: z.string(),   // ISO String
  status: z.enum(['scheduled', 'confirmed', 'cancelled', 'completed']),
  externalRef: z.string().optional(),
});

export const FileRefSchema = z.object({
  id: z.string(),
  leadId: z.string(),
  name: z.string(),
  url: z.string().url(),
  type: z.string(), // mime type
  createdAt: z.string(),
});

export const AuditEventSchema = z.object({
  id: z.string(),
  leadId: z.string(),
  timestamp: z.string(),
  event: z.string(),
  details: z.string().optional(),
  actor: z.string().default('system'),
});

export type Homeowner = z.infer<typeof HomeownerSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type Lead = z.infer<typeof LeadSchema>;
export type Appointment = z.infer<typeof AppointmentSchema>;
export type FileRef = z.infer<typeof FileRefSchema>;
export type AuditEvent = z.infer<typeof AuditEventSchema>;
