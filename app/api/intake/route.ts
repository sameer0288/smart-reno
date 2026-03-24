import { NextRequest, NextResponse } from 'next/server';
import { LeadSchema } from '@/lib/schemas';
import { AdapterFactory } from '@/adapters';
import { globalStore as store } from '@/lib/store';


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // 1. Validate
    const leadData = {
      ...body,
      id: `sr_lead_${Math.random().toString(36).substring(7)}`,
      status: 'intake_received',
      createdAt: new Date().toISOString(),
    };
    
    const validatedLead = LeadSchema.parse(leadData);
    
    // 2. Save to SmartReno Store
    await store.saveLead(validatedLead);
    
    // 3. Sync to Provider (e.g., Buildertrend)
    const providerName = req.nextUrl.searchParams.get('provider') || 'buildertrend';
    const adapter = AdapterFactory.getAdapter(providerName);
    const externalRef = await adapter.createLead(validatedLead);
    
    // 4. Update status with External Ref
    await store.updateLeadStatus(validatedLead.id, 'synced', externalRef);
    
    return NextResponse.json({ 
      success: true, 
      leadId: validatedLead.id, 
      externalRef 
    }, { status: 201 });
    
  } catch (error: any) {
    console.error('Intake Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Internal Server Error',
      details: error.errors || null
    }, { status: 400 });
  }
}
