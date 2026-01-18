import 'server-only';
import { env } from '@/lib/env';

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played';
const USER_PLAYLISTS_ENDPOINT = 'https://api.spotify.com/v1/me/playlists';
const TOP_TRACKS_ENDPOINT = 'https://api.spotify.com/v1/me/top/tracks';
const TOP_ARTISTS_ENDPOINT = 'https://api.spotify.com/v1/me/top/artists';

export type SpotifyTrack = {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
};

type SpotifyAccessTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
};

type SpotifyNowPlayingResponse = {
  is_playing: boolean;
  item: {
    name: string;
    artists: { name: string }[];
    album: {
      name: string;
      images: { url: string; height: number; width: number }[];
    };
    external_urls: {
      spotify: string;
    };
  };
};

type SpotifyRecentlyPlayedResponse = {
  items: {
    track: {
      name: string;
      artists: { name: string }[];
      album: {
        name: string;
        images: { url: string; height: number; width: number }[];
      };
      external_urls: {
        spotify: string;
      };
    };
    played_at: string;
  }[];
};

export type SpotifyPlaylist = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  url: string;
  tracksCount: number;
  owner: string;
};

export type SpotifyTopTrack = {
  id: string;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
};

export type SpotifyRecentTrack = {
  id: string;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
  playedAt: string;
};

export type SpotifyArtist = {
  id: string;
  name: string;
  imageUrl: string;
  url: string;
  genres: string[];
};

type SpotifyPlaylistsResponse = {
  items: {
    id: string;
    name: string;
    description: string;
    images: { url: string; height: number; width: number }[];
    external_urls: {
      spotify: string;
    };
    tracks: {
      total: number;
    };
    owner: {
      display_name: string;
    };
  }[];
};

type SpotifyTopTracksResponse = {
  items: {
    id: string;
    name: string;
    artists: { name: string }[];
    album: {
      name: string;
      images: { url: string; height: number; width: number }[];
    };
    external_urls: {
      spotify: string;
    };
  }[];
};

type SpotifyTopArtistsResponse = {
  items: {
    id: string;
    name: string;
    images: { url: string; height: number; width: number }[];
    external_urls: {
      spotify: string;
    };
    genres: string[];
  }[];
};

const getAccessToken = async (): Promise<string> => {
  const basic = Buffer.from(`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`).toString(
    'base64',
  );

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: env.SPOTIFY_REFRESH_TOKEN,
    }),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to get Spotify access token');
  }

  const data = (await response.json()) as SpotifyAccessTokenResponse;
  return data.access_token;
};

export const getNowPlaying = async (): Promise<SpotifyTrack | null> => {
  try {
    const accessToken = await getAccessToken();

    // Try to get currently playing first
    const nowPlayingResponse = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
    });

    // If something is currently playing
    if (nowPlayingResponse.status === 200) {
      const data = (await nowPlayingResponse.json()) as SpotifyNowPlayingResponse;

      if (data.item) {
        return {
          isPlaying: data.is_playing,
          title: data.item.name,
          artist: data.item.artists.map((artist) => artist.name).join(', '),
          album: data.item.album.name,
          albumImageUrl: data.item.album.images[0]?.url ?? '',
          songUrl: data.item.external_urls.spotify,
        };
      }
    }

    // If nothing is playing (204) or other status, get recently played
    const recentlyPlayedResponse = await fetch(`${RECENTLY_PLAYED_ENDPOINT}?limit=1`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
    });

    if (recentlyPlayedResponse.ok) {
      const data = (await recentlyPlayedResponse.json()) as SpotifyRecentlyPlayedResponse;

      if (data.items && data.items.length > 0) {
        const track = data.items[0].track;
        return {
          isPlaying: false,
          title: track.name,
          artist: track.artists.map((artist) => artist.name).join(', '),
          album: track.album.name,
          albumImageUrl: track.album.images[0]?.url ?? '',
          songUrl: track.external_urls.spotify,
        };
      }
    }

    return null;
  } catch (error) {
    console.error('Error fetching Spotify data:', error);
    return null;
  }
};

export const getPlaylists = async (limit = 6): Promise<SpotifyPlaylist[]> => {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(`${USER_PLAYLISTS_ENDPOINT}?limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return [];
    }

    const data = (await response.json()) as SpotifyPlaylistsResponse;

    return data.items.map((playlist) => ({
      id: playlist.id,
      name: playlist.name,
      description: playlist.description || '',
      imageUrl: playlist.images?.[0]?.url ?? '',
      url: playlist.external_urls.spotify,
      tracksCount: playlist.tracks.total,
      owner: playlist.owner.display_name,
    }));
  } catch (error) {
    console.error('Error fetching Spotify playlists:', error);
    return [];
  }
};

export const getTopTracks = async (
  limit = 10,
  timeRange: 'short_term' | 'medium_term' | 'long_term' = 'short_term',
): Promise<SpotifyTopTrack[]> => {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(`${TOP_TRACKS_ENDPOINT}?limit=${limit}&time_range=${timeRange}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return [];
    }

    const data = (await response.json()) as SpotifyTopTracksResponse;

    return data.items.map((track) => ({
      id: track.id,
      title: track.name,
      artist: track.artists.map((a) => a.name).join(', '),
      album: track.album.name,
      albumImageUrl: track.album.images?.[0]?.url ?? '',
      songUrl: track.external_urls.spotify,
    }));
  } catch (error) {
    console.error('Error fetching Spotify top tracks:', error);
    return [];
  }
};

export const getRecentlyPlayed = async (limit = 10): Promise<SpotifyRecentTrack[]> => {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(`${RECENTLY_PLAYED_ENDPOINT}?limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return [];
    }

    const data = (await response.json()) as SpotifyRecentlyPlayedResponse;

    return data.items.map((item) => ({
      id: item.track.external_urls.spotify,
      title: item.track.name,
      artist: item.track.artists.map((a) => a.name).join(', '),
      album: item.track.album.name,
      albumImageUrl: item.track.album.images?.[0]?.url ?? '',
      songUrl: item.track.external_urls.spotify,
      playedAt: item.played_at,
    }));
  } catch (error) {
    console.error('Error fetching Spotify recently played:', error);
    return [];
  }
};

export const getTopArtists = async (
  limit = 10,
  timeRange: 'short_term' | 'medium_term' | 'long_term' = 'short_term',
): Promise<SpotifyArtist[]> => {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(`${TOP_ARTISTS_ENDPOINT}?limit=${limit}&time_range=${timeRange}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return [];
    }

    const data = (await response.json()) as SpotifyTopArtistsResponse;

    return data.items.map((artist) => ({
      id: artist.id,
      name: artist.name,
      imageUrl: artist.images?.[0]?.url ?? '',
      url: artist.external_urls.spotify,
      genres: artist.genres.slice(0, 2),
    }));
  } catch (error) {
    console.error('Error fetching Spotify top artists:', error);
    return [];
  }
};
