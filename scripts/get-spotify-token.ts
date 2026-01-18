/**
 * Spotify Refresh Token Generator
 *
 * Cara penggunaan:
 * 1. Pastikan SPOTIFY_CLIENT_ID dan SPOTIFY_CLIENT_SECRET sudah ada di .env
 * 2. Tambahkan redirect URI di Spotify Dashboard (lihat instruksi di bawah)
 * 3. Jalankan: bun run scripts/get-spotify-token.ts
 * 4. Buka URL yang muncul di browser
 * 5. Login dan authorize aplikasi
 * 6. Copy URL redirect (akan error 404, tidak apa-apa)
 * 7. Paste URL tersebut ke terminal
 * 8. Refresh token akan ditampilkan, copy ke .env
 */

import { createInterface } from 'readline';

// Load environment variables
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = 'https://bhsk.dev';

const SCOPES = [
  'user-read-currently-playing',
  'user-read-recently-played',
  'playlist-read-private',
  'playlist-read-collaborative',
  'user-top-read',
].join(' ');

if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
  console.error('❌ Error: SPOTIFY_CLIENT_ID dan SPOTIFY_CLIENT_SECRET harus ada di .env');
  console.error('');
  console.error('Pastikan file .env berisi:');
  console.error('  SPOTIFY_CLIENT_ID=your_client_id');
  console.error('  SPOTIFY_CLIENT_SECRET=your_client_secret');
  process.exit(1);
}

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function main() {
  console.log('');
  console.log('🎵 Spotify Refresh Token Generator');
  console.log('===================================');
  console.log('');

  // Step 1: Generate authorization URL
  const authUrl = new URL('https://accounts.spotify.com/authorize');
  authUrl.searchParams.set('client_id', SPOTIFY_CLIENT_ID!);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('redirect_uri', REDIRECT_URI);
  authUrl.searchParams.set('scope', SCOPES);

  console.log('📋 Langkah 1: Buka URL berikut di browser:');
  console.log('');
  console.log(`   ${authUrl.toString()}`);
  console.log('');
  console.log('📋 Langkah 2: Login ke Spotify dan klik "Agree"');
  console.log('');
  console.log('📋 Langkah 3: Browser akan redirect ke bhsk.dev.');
  console.log('   Copy SELURUH URL dari address bar (termasuk ?code=...)');
  console.log(`   (URL akan seperti: ${REDIRECT_URI}?code=AQD...)`);
  console.log('');

  const callbackUrl = await question('📥 Paste URL callback di sini: ');

  // Extract authorization code from callback URL
  let code: string | null = null;
  try {
    const url = new URL(callbackUrl.trim());
    code = url.searchParams.get('code');
  } catch {
    console.error(`❌ URL tidak valid. Pastikan URL dimulai dengan ${REDIRECT_URI}`);
    rl.close();
    process.exit(1);
  }

  if (!code) {
    console.error('❌ Authorization code tidak ditemukan di URL');
    console.error('   Pastikan Anda sudah login dan klik "Agree" di Spotify');
    rl.close();
    process.exit(1);
  }

  console.log('');
  console.log('⏳ Menukar authorization code dengan tokens...');

  // Step 2: Exchange code for tokens
  const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
    }),
  });

  if (!tokenResponse.ok) {
    const error = await tokenResponse.text();
    console.error('❌ Gagal mendapatkan token:', error);
    console.error('');
    console.error('Kemungkinan penyebab:');
    console.error('  - Redirect URI tidak cocok dengan yang di Spotify Dashboard');
    console.error('  - Authorization code sudah expired (coba lagi dari awal)');
    console.error('  - Client ID atau Client Secret salah');
    rl.close();
    process.exit(1);
  }

  const tokens = (await tokenResponse.json()) as {
    access_token: string;
    token_type: string;
    scope: string;
    expires_in: number;
    refresh_token: string;
  };

  console.log('');
  console.log('✅ Berhasil mendapatkan tokens!');
  console.log('');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('');
  console.log('📋 Tambahkan baris berikut ke file .env:');
  console.log('');
  console.log(`   SPOTIFY_REFRESH_TOKEN=${tokens.refresh_token}`);
  console.log('');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('');
  console.log('ℹ️  Refresh token ini tidak akan expire selama:');
  console.log('   - Tidak di-revoke dari Spotify account settings');
  console.log('   - Aplikasi Spotify tidak dihapus');
  console.log('');

  rl.close();
}

main().catch((error) => {
  console.error('❌ Error:', error);
  rl.close();
  process.exit(1);
});
