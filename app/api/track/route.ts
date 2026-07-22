import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function POST(request: Request) {
  try {
    const { resourceId } = await request.json();
    if (!resourceId) {
      return NextResponse.json({ error: 'resourceId is required' }, { status: 400 });
    }

    if (process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('example.supabase.co')) {
      // Call Supabase RPC to increment counter
      const { error } = await supabase.rpc('increment_download_count', { resource_id: resourceId });
      if (error) {
        console.error('Supabase track error:', error);
      }
    } else {
      console.log(`[Track API] Simulating download count increment for resource: ${resourceId}`);
    }

    return NextResponse.json({ success: true, resourceId });
  } catch (err) {
    console.error('Error tracking download:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
