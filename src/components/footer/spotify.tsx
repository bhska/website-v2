'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { SpotifyTrack } from '@/lib/spotify';

// Animated bars for "now playing" indicator
const SoundBars = () => (
  <div className="flex h-3 items-end gap-[2px]">
    {[1, 2, 3].map((i) => (
      <span
        key={i}
        className={cn(
          'w-[3px] rounded-sm bg-[#1DB954]',
          'animate-[soundbar_0.8s_ease-in-out_infinite]',
        )}
        style={{
          animationDelay: `${i * 0.15}s`,
          height: '100%',
        }}
      />
    ))}
  </div>
);

// Spotify logo SVG
const SpotifyIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 168 168" fill="currentColor" aria-hidden="true">
    <path d="M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.744-83.742zm38.404 120.78a5.217 5.217 0 01-7.18 1.73c-19.662-12.01-44.414-14.73-73.564-8.07a5.222 5.222 0 01-6.249-3.93 5.213 5.213 0 013.926-6.25c31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-.903-8.148-4.35a6.538 6.538 0 014.354-8.143c30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976zm.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219a7.835 7.835 0 015.221-9.771c29.581-8.98 78.756-7.245 109.83 11.202a7.823 7.823 0 012.74 10.733c-2.2 3.722-7.02 4.949-10.73 2.739z" />
  </svg>
);

export const SpotifyNowPlaying = () => {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const response = await fetch('/api/spotify/now-playing');
        if (response.ok) {
          const data = (await response.json()) as SpotifyTrack;
          if (data.title) {
            setTrack(data);
          } else {
            setTrack(null);
          }
        }
      } catch {
        setTrack(null);
      } finally {
        setLoading(false);
      }
    };

    fetchNowPlaying();
    // Poll every 30 seconds
    const interval = setInterval(fetchNowPlaying, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-background flex items-center gap-3 rounded-md border px-3 py-2 shadow-xs">
        <SpotifyIcon className="size-4 text-[#1DB954]" />
        <span className="text-muted-foreground text-xs md:text-sm">Loading...</span>
      </div>
    );
  }

  if (!track) {
    return (
      <Link
        href="https://open.spotify.com"
        target="_blank"
        rel="noreferrer"
        className="bg-background hover:bg-accent flex items-center gap-3 rounded-md border px-3 py-2 shadow-xs transition-colors"
      >
        <SpotifyIcon className="size-4 text-[#1DB954]" />
        <span className="text-muted-foreground text-xs md:text-sm">Not playing</span>
      </Link>
    );
  }

  return (
    <Link
      href={track.songUrl}
      target="_blank"
      rel="noreferrer"
      className="group bg-background hover:bg-accent flex items-center gap-3 rounded-md border px-3 py-2 shadow-xs transition-colors"
    >
      {/* Album Art */}
      <div className="relative size-8 shrink-0 overflow-hidden rounded-sm">
        <Image
          src={track.albumImageUrl}
          alt={track.album}
          fill
          className="object-cover"
          sizes="32px"
        />
      </div>

      {/* Track Info */}
      <div className="flex min-w-0 flex-col">
        <span className="truncate text-xs font-medium md:text-sm">{track.title}</span>
        <span className="text-muted-foreground truncate text-[10px] md:text-xs">
          {track.artist}
        </span>
      </div>

      {/* Now Playing Indicator or Spotify Icon */}
      <div className="ml-auto shrink-0">
        {track.isPlaying ? <SoundBars /> : <SpotifyIcon className="size-4 text-[#1DB954]" />}
      </div>
    </Link>
  );
};
