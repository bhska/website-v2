import { NextResponse } from 'next/server';
import { getPlaylists } from '@/lib/spotify';

export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  const playlists = await getPlaylists(6);
  return NextResponse.json(playlists);
}
