import { NextRequest, NextResponse } from 'next/server';
import { globalStore as store } from '@/lib/store';
import { AdapterFactory } from '@/adapters';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const leadId = formData.get('leadId') as string;
    const file = formData.get('file') as File;
    
    if (!leadId || !file) {
      return NextResponse.json({ success: false, error: 'Missing leadId or file' }, { status: 400 });
    }
    
    // 1. Mock file reference
    const fileRef = {
      id: `sr_file_${Math.random().toString(36).substring(7)}`,
      leadId,
      name: file.name,
      url: `https://mock-storage.smartreno.io/${file.name}`,
      type: file.type,
      createdAt: new Date().toISOString(),
    };
    
    // 2. Save to store
    await store.saveFileRef(fileRef);
    
    // 3. Sync to adapter
    const adapter = AdapterFactory.getAdapter('buildertrend'); // Default for demo
    await adapter.syncFile(fileRef);
    
    return NextResponse.json({ success: true, fileId: fileRef.id });
    
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
