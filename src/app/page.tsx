'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { HighlightedWorks } from '@/components/sections/highlighted-works';
import { SpotifySection } from '@/components/sections/spotify-section';
import { Section } from '@/components/common/section';
import { ViewAnimation } from '@/providers/view-animation';
import { galleryItems } from '@/configs/gallery';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const Gallery = dynamic(() => import('@/components/animations/gallery'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-neutral-100">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-600" />
    </div>
  ),
});

export default function Home() {
  const [showGallery, setShowGallery] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGallery(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Section>
        <ViewAnimation
          initial={{ opacity: 0, translateY: -8 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          delay={0.2}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Text Content */}
            <div className="flex flex-col justify-center gap-6 px-4 lg:col-span-5 lg:border-r lg:pr-8">
              <h2 className="font-mono text-4xl font-medium md:text-5xl">
                Azra Muhammad Bhaskarogra
              </h2>

              <p className="prose text-muted-foreground">
                An inquisitive software artisan and digital conjurer, passionately immersed in the
                intricate symphony of codecraft, perpetually driven by a relentless quest for
                computational elegance and interactive ingenuity.
              </p>

              <Link
                href="/about"
                className="text-muted-foreground mt-2 w-fit cursor-pointer font-mono text-sm transition-all duration-300 ease-in-out hover:scale-101 hover:text-black hover:underline"
              >
                Get to know more!
              </Link>
            </div>

            {/* Image Grid with Striped Background */}
            <div className="lg:col-span-7">
              <div
                className="relative aspect-square overflow-hidden rounded-lg"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px',
                }}
              >
                <Image
                  src="/images/me-square.webp"
                  alt="Azra Muhammad Bhaskarogra"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </ViewAnimation>
      </Section>

      <HighlightedWorks />

      <div className="relative">
        <ViewAnimation
          initial={{ opacity: 0, translateY: -8 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          delay={0.4}
          viewport={{ once: true }}
        >
          <Section className="relative flex h-[50svh] flex-col items-center gap-4 pt-6">
            <span className="prose text-muted-foreground px-4 text-center text-sm">
              A curated visual anthology capturing fragments and chronicles of my technological
              odyssey.
            </span>
            <Link
              href="/gallery"
              className="text-muted-foreground z-[100] cursor-pointer font-mono text-sm transition-all duration-300 ease-in-out hover:scale-105 hover:text-black hover:underline"
            >
              Show More
            </Link>

            {showGallery && (
              <Gallery
                items={galleryItems}
                bend={2}
                textColor="#333"
                borderRadius={0.05}
                className="absolute bottom-0 left-0 z-10 h-5/6 w-full md:h-5/6"
              />
            )}
          </Section>
        </ViewAnimation>
      </div>

      <Section className="flex flex-col items-center gap-4 py-12">
        <ViewAnimation
          initial={{ opacity: 0, translateY: -8 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          delay={0.6}
          viewport={{ once: true }}
        >
          <div className="flex flex-col items-center gap-4">
            <span className="prose text-muted-foreground px-4 text-center text-sm">
              Feel free to reach out for collaborations, inquiries, or just a friendly chat!
            </span>
            <Link
              href="/contact"
              className="text-muted-foreground cursor-pointer font-mono text-sm transition-all duration-300 ease-in-out hover:scale-105 hover:text-black hover:underline"
            >
              Get in Touch
            </Link>
          </div>
        </ViewAnimation>
      </Section>

      <SpotifySection />
    </>
  );
}
