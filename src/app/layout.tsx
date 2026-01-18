import type React from 'react';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Toaster } from '@/components/ui/sonner';
import { Analytics } from '@vercel/analytics/react';
import { baseURL, home, person } from '@/resources';
import { SpeedInsights } from '@vercel/speed-insights/next';

import InteractivityProvider from '@/providers/interactivity';

import '@/assets/styles/globals.css';

export async function generateMetadata() {
  return {
    metadataBase: new URL(`https://${baseURL}`),
    title: home.title,
    description: home.description,
    openGraph: {
      title: `${person.firstName}'s Portfolio`,
      description: `Portfolio website showcasing ${person.firstName}'s work.`,
      url: baseURL,
      siteName: `${person.firstName}'s Portfolio`,
      locale: 'en_US',
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb#"
      itemType="http://schema.org/WebPage"
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.cdnfonts.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.cdnfonts.com/css/vcr-osd-mono" rel="stylesheet" />
        <link href="https://fonts.cdnfonts.com/css/ranade" rel="stylesheet" />
        <link href="https://fonts.cdnfonts.com/css/instrument-sans" rel="stylesheet" />
        <link href="https://fonts.cdnfonts.com/css/inclusive-sans-2" rel="stylesheet" />
      </head>
      <body className="bg-backdrop h-full min-h-screen overflow-x-hidden font-sans antialiased">
        <InteractivityProvider>
          <Header />
          <div className="bg-backdrop/90 fixed top-0 right-0 left-0 z-40 container mx-auto h-[53px] border-b sm:h-[73px]" />
          <div className="h-[53px] sm:h-[73px]" />
          <main className="flex-1 divide-y sm:border-b">{children}</main>
          <Footer />
          <Toaster />
          <Analytics />
          <SpeedInsights />
        </InteractivityProvider>
      </body>
    </html>
  );
}
