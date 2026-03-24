import { NextRequest, NextResponse } from 'next/server';
import { globalStore as store } from '@/lib/store';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ leadId: string }> }
) {
  try {
    const { leadId } = await params;
    const lead = await store.getLead(leadId);

    if (!lead) {
      return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 });
    }
    
    const logs = await store.getAuditLogs(leadId);
    const appointments = await store.getAppointmentsForLead(leadId);
    const files = await store.getFilesForLead(leadId);
    
    return NextResponse.json({ 
      success: true, 
      lead,
      history: logs,
      appointments,
      files
    });
    
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Internal Server Error' 
    }, { status: 500 });
  }
}
