import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    BETTERSTACK_API_KEY: z.string().min(1),
    BETTERSTACK_URL: z.string().min(1),

    SPOTIFY_CLIENT_ID: z.string().min(1),
    SPOTIFY_CLIENT_SECRET: z.string().min(1),
    SPOTIFY_REFRESH_TOKEN: z.string().min(1),

    EDGE_CONFIG_ID: z.string().min(1),
    VERCEL_TOKEN: z.string().min(1),

    // Added by Vercel
    VERCEL_PROJECT_PRODUCTION_URL: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_LOGO_DEV_TOKEN: z.string().min(1).startsWith('pk_'),
  },
  runtimeEnv: {
    BETTERSTACK_API_KEY: process.env.BETTERSTACK_API_KEY,
    BETTERSTACK_URL: process.env.BETTERSTACK_URL,

    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
    SPOTIFY_REFRESH_TOKEN: process.env.SPOTIFY_REFRESH_TOKEN,

    EDGE_CONFIG_ID: process.env.EDGE_CONFIG_ID,
    VERCEL_TOKEN: process.env.VERCEL_TOKEN,

    NEXT_PUBLIC_LOGO_DEV_TOKEN: process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN,
    VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL,
  },
});
