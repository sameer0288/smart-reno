import { NextRequest, NextResponse } from 'next/server';
import { AppointmentSchema } from '@/lib/schemas';
import { globalStore as store } from '@/lib/store';
import { AdapterFactory } from '@/adapters';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // 1. Validate
    const apptData = {
      ...body,
      id: `sr_appt_${Math.random().toString(36).substring(7)}`,
      status: 'scheduled',
    };
    
    const validatedAppt = AppointmentSchema.parse(apptData);
    
    // 2. Save to SmartReno Store
    await store.saveAppointment(validatedAppt);
    
    // 3. Sync to Provider
    const providerName = req.nextUrl.searchParams.get('provider') || 'buildertrend';
    const adapter = AdapterFactory.getAdapter(providerName);
    const externalRef = await adapter.createAppointment(validatedAppt);
    
    // 4. Update status with External Ref
    validatedAppt.externalRef = externalRef;
    store.saveAppointment(validatedAppt);
    
    return NextResponse.json({ 
      success: true, 
      apptId: validatedAppt.id, 
      externalRef 
    }, { status: 201 });
    
  } catch (error: any) {
    console.error('Appointment Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Internal Server Error' 
    }, { status: 400 });
  }
}
