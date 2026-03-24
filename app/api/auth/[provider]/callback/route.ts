import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  try {
    const { provider } = await params;
    const searchParams = req.nextUrl.searchParams;
    const code = searchParams.get('code');
    
    if (!code) {
      return NextResponse.json({ success: false, error: 'Authorization code missing' }, { status: 400 });
    }
    
    console.log(`[OAuth] Swapping code for ${provider} tokens...`);
    
    // In a real app, we'd exchange code for tokens and store them
    return NextResponse.redirect(new URL('/dashboard?auth=success', req.url));
    
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
