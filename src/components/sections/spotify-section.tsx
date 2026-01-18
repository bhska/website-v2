'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type {
  SpotifyTrack,
  SpotifyPlaylist,
  SpotifyTopTrack,
  SpotifyRecentTrack,
  SpotifyArtist,
} from '@/lib/spotify';
import { Section } from '@/components/common/section';
import { ViewAnimation } from '@/providers/view-animation';

// Subtle playing indicator
const PlayingIndicator = () => (
  <div className="flex h-3 items-end gap-[2px]">
    <span
      className="w-[3px] animate-[soundbar_1s_ease-in-out_infinite] rounded-sm bg-[#1DB954]"
      style={{ height: '100%' }}
    />
    <span
      className="w-[3px] animate-[soundbar_1s_ease-in-out_infinite] rounded-sm bg-[#1DB954]"
      style={{ animationDelay: '0.2s', height: '100%' }}
    />
  </div>
);

// Spotify logo SVG
const SpotifyIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 168 168" fill="currentColor" aria-hidden="true">
    <path d="M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.744-83.742zm38.404 120.78a5.217 5.217 0 01-7.18 1.73c-19.662-12.01-44.414-14.73-73.564-8.07a5.222 5.222 0 01-6.249-3.93 5.213 5.213 0 013.926-6.25c31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-.903-8.148-4.35a6.538 6.538 0 014.354-8.143c30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976zm.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219a7.835 7.835 0 015.221-9.771c29.581-8.98 78.756-7.245 109.83 11.202a7.823 7.823 0 012.74 10.733c-2.2 3.722-7.02 4.949-10.73 2.739z" />
  </svg>
);

// Horizontal scroll container
const ScrollRow = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-3">
    <span className="text-muted-foreground px-6 text-xs md:px-10">{title}</span>
    <div className="scrollbar-hide flex gap-3 overflow-x-auto px-6 pb-2 md:px-10">{children}</div>
  </div>
);

// Track card component
const TrackCard = ({
  title,
  artist,
  imageUrl,
  url,
}: {
  title: string;
  artist: string;
  imageUrl: string;
  url: string;
}) => (
  <Link
    href={url}
    target="_blank"
    rel="noreferrer"
    className="group flex w-28 shrink-0 flex-col gap-2"
  >
    <div className="relative aspect-square w-full overflow-hidden rounded shadow-sm transition-shadow group-hover:shadow-md">
      {imageUrl ? (
        <Image src={imageUrl} alt={title} fill className="object-cover" sizes="112px" />
      ) : (
        <div className="bg-muted flex h-full w-full items-center justify-center">
          <SpotifyIcon className="size-8 text-[#1DB954]/20" />
        </div>
      )}
    </div>
    <div className="flex flex-col">
      <span className="truncate text-xs font-medium">{title}</span>
      <span className="text-muted-foreground truncate text-[10px]">{artist}</span>
    </div>
  </Link>
);

// Artist card component
const ArtistCard = ({
  name,
  imageUrl,
  url,
  genres,
}: {
  name: string;
  imageUrl: string;
  url: string;
  genres: string[];
}) => (
  <Link
    href={url}
    target="_blank"
    rel="noreferrer"
    className="group flex w-24 shrink-0 flex-col items-center gap-2"
  >
    <div className="relative size-20 overflow-hidden rounded-full shadow-sm transition-shadow group-hover:shadow-md">
      {imageUrl ? (
        <Image src={imageUrl} alt={name} fill className="object-cover" sizes="80px" />
      ) : (
        <div className="bg-muted flex h-full w-full items-center justify-center">
          <SpotifyIcon className="size-6 text-[#1DB954]/20" />
        </div>
      )}
    </div>
    <div className="flex flex-col items-center">
      <span className="max-w-full truncate text-xs font-medium">{name}</span>
      {genres.length > 0 && (
        <span className="text-muted-foreground max-w-full truncate text-[10px]">{genres[0]}</span>
      )}
    </div>
  </Link>
);

// Playlist card component
const PlaylistCard = ({
  name,
  imageUrl,
  url,
  tracksCount,
}: {
  name: string;
  imageUrl: string;
  url: string;
  tracksCount: number;
}) => (
  <Link
    href={url}
    target="_blank"
    rel="noreferrer"
    className="group flex w-28 shrink-0 flex-col gap-2"
  >
    <div className="relative aspect-square w-full overflow-hidden rounded shadow-sm transition-shadow group-hover:shadow-md">
      {imageUrl ? (
        <Image src={imageUrl} alt={name} fill className="object-cover" sizes="112px" />
      ) : (
        <div className="bg-muted flex h-full w-full items-center justify-center">
          <SpotifyIcon className="size-8 text-[#1DB954]/20" />
        </div>
      )}
    </div>
    <div className="flex flex-col">
      <span className="truncate text-xs font-medium">{name}</span>
      <span className="text-muted-foreground truncate text-[10px]">{tracksCount} tracks</span>
    </div>
  </Link>
);

export const SpotifySection = () => {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [topTracks, setTopTracks] = useState<SpotifyTopTrack[]>([]);
  const [recentTracks, setRecentTracks] = useState<SpotifyRecentTrack[]>([]);
  const [topArtists, setTopArtists] = useState<SpotifyArtist[]>([]);
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trackRes, topTracksRes, recentRes, artistsRes, playlistsRes] = await Promise.all([
          fetch('/api/spotify/now-playing'),
          fetch('/api/spotify/top-tracks'),
          fetch('/api/spotify/recently-played'),
          fetch('/api/spotify/top-artists'),
          fetch('/api/spotify/playlists'),
        ]);

        if (trackRes.ok) {
          const data = (await trackRes.json()) as SpotifyTrack;
          if (data.title) setTrack(data);
        }

        if (topTracksRes.ok) {
          const data = (await topTracksRes.json()) as SpotifyTopTrack[];
          setTopTracks(data.filter((t) => t.albumImageUrl));
        }

        if (recentRes.ok) {
          const data = (await recentRes.json()) as SpotifyRecentTrack[];
          setRecentTracks(data.filter((t) => t.albumImageUrl));
        }

        if (artistsRes.ok) {
          const data = (await artistsRes.json()) as SpotifyArtist[];
          setTopArtists(data.filter((a) => a.imageUrl));
        }

        if (playlistsRes.ok) {
          const data = (await playlistsRes.json()) as SpotifyPlaylist[];
          setPlaylists(data.filter((p) => p.imageUrl));
        }
      } catch {
        // Silently fail
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Poll now playing every 30 seconds
    const interval = setInterval(async () => {
      try {
        const res = await fetch('/api/spotify/now-playing');
        if (res.ok) {
          const data = (await res.json()) as SpotifyTrack;
          setTrack(data.title ? data : null);
        }
      } catch {
        // Silently fail
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Section className="py-10 md:py-12">
      <ViewAnimation
        initial={{ opacity: 0, translateY: -8 }}
        whileInView={{ opacity: 1, translateY: 0 }}
        delay={0.3}
        viewport={{ once: true }}
      >
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center gap-2 px-6 md:px-10">
            <SpotifyIcon className="size-4 text-[#1DB954]" />
            <span className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
              Spotify
            </span>
          </div>

          {/* Now Playing */}
          <div className="flex flex-col gap-3 px-6 md:px-10">
            <span className="text-muted-foreground text-xs">Now Playing</span>
            {loading ? (
              <div className="flex items-center gap-4">
                <div className="bg-muted size-16 animate-pulse rounded" />
                <div className="flex flex-col gap-1.5">
                  <div className="bg-muted h-4 w-32 animate-pulse rounded" />
                  <div className="bg-muted h-3 w-24 animate-pulse rounded" />
                </div>
              </div>
            ) : track ? (
              <Link
                href={track.songUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4"
              >
                <div className="relative size-16 shrink-0 overflow-hidden rounded shadow-sm transition-shadow group-hover:shadow-md">
                  <Image
                    src={track.albumImageUrl}
                    alt={track.album}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className="max-w-[200px] truncate text-sm font-medium md:max-w-xs">
                      {track.title}
                    </span>
                    {track.isPlaying && <PlayingIndicator />}
                  </div>
                  <span className="text-muted-foreground max-w-[200px] truncate text-xs md:max-w-xs">
                    {track.artist}
                  </span>
                  <span className="text-muted-foreground/60 max-w-[200px] truncate text-[10px] md:max-w-xs">
                    {track.album}
                  </span>
                </div>
              </Link>
            ) : (
              <div className="flex items-center gap-4">
                <div className="bg-muted/50 flex size-16 items-center justify-center rounded">
                  <SpotifyIcon className="size-8 text-[#1DB954]/20" />
                </div>
                <span className="text-muted-foreground text-xs">Not playing</span>
              </div>
            )}
          </div>

          {/* Top Tracks */}
          {topTracks.length > 0 && (
            <ScrollRow title="Top Tracks">
              {topTracks.map((t) => (
                <TrackCard
                  key={t.id}
                  title={t.title}
                  artist={t.artist}
                  imageUrl={t.albumImageUrl}
                  url={t.songUrl}
                />
              ))}
            </ScrollRow>
          )}

          {/* Recently Played */}
          {recentTracks.length > 0 && (
            <ScrollRow title="Recently Played">
              {recentTracks.map((t, idx) => (
                <TrackCard
                  key={`${t.id}-${idx}`}
                  title={t.title}
                  artist={t.artist}
                  imageUrl={t.albumImageUrl}
                  url={t.songUrl}
                />
              ))}
            </ScrollRow>
          )}

          {/* Top Artists */}
          {topArtists.length > 0 && (
            <ScrollRow title="Top Artists">
              {topArtists.map((a) => (
                <ArtistCard
                  key={a.id}
                  name={a.name}
                  imageUrl={a.imageUrl}
                  url={a.url}
                  genres={a.genres}
                />
              ))}
            </ScrollRow>
          )}

          {/* Playlists */}
          {playlists.length > 0 && (
            <ScrollRow title="My Playlists">
              {playlists.map((p) => (
                <PlaylistCard
                  key={p.id}
                  name={p.name}
                  imageUrl={p.imageUrl}
                  url={p.url}
                  tracksCount={p.tracksCount}
                />
              ))}
            </ScrollRow>
          )}
        </div>
      </ViewAnimation>
    </Section>
  );
};
