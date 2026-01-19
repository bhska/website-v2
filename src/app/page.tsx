'use client';

import { HighlightedWorks } from '@/components/sections/highlighted-works';
import { SpotifySection } from '@/components/sections/spotify-section';
import { Section } from '@/components/common/section';
import { ViewAnimation } from '@/providers/view-animation';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Section>
        <ViewAnimation
          initial={{ opacity: 0, translateY: -8 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          delay={0.2}
          viewport={{ once: true }}
        >
          <div className="flex flex-col items-start justify-center gap-6 py-8">
            <h2 className="font-mono text-4xl font-medium md:text-5xl">
              Azra Muhammad Bhaskarogra
            </h2>

            <p className="prose text-muted-foreground max-w-2xl">
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
        </ViewAnimation>
      </Section>

      <HighlightedWorks />

      <Section className="flex flex-col items-center gap-4 py-12">
        <ViewAnimation
          initial={{ opacity: 0, translateY: -8 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          delay={0.4}
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
