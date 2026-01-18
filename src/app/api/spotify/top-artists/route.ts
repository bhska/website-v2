import { NextResponse } from 'next/server';
import { getTopArtists } from '@/lib/spotify';

export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  const artists = await getTopArtists(10, 'short_term');
  return NextResponse.json(artists);
}
