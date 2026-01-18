import { NextResponse } from 'next/server';
import { getTopTracks } from '@/lib/spotify';

export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  const tracks = await getTopTracks(10, 'short_term');
  return NextResponse.json(tracks);
}
