import { NextResponse } from 'next/server';
import { getRecentlyPlayed } from '@/lib/spotify';

export const revalidate = 300; // Revalidate every 5 minutes

export async function GET() {
  const tracks = await getRecentlyPlayed(10);
  return NextResponse.json(tracks);
}
