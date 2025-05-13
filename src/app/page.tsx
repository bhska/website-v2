'use client';

import Gallery from '@/components/animations/gallery';
import Lanyard from '@/components/animations/lanyard';
import { Section } from '@/components/common/section';
import { ViewAnimation } from '@/providers/view-animation';
import { galleryItems } from '@/configs/gallery';
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
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-dashed flex aspect-video flex-col justify-center border-b p-10 md:aspect-square md:border-r md:border-b-0">
              <h2 className="font-mono text-3xl font-medium sm:text-4xl md:text-5xl">
                Azra Muhammad
              </h2>
              <h2 className="font-mono text-3xl font-medium sm:text-4xl md:text-5xl">
                Bhaskarogra
              </h2>

              <p className="prose mt-4">
                "An inquisitive software artisan and digital conjurer, passionately immersed in the
                intricate symphony of codecraft, perpetually driven by a relentless quest for
                computational elegance and interactive ingenuity."
              </p>

              <Link
                href="/about"
                className="text-muted-foreground mt-6 w-fit cursor-pointer font-mono text-sm transition-all duration-300 ease-in-out hover:scale-101 hover:text-black hover:underline"
              >
                Get to know more!
              </Link>
            </div>

            <div className="aspect-square">
              <Lanyard position={[1, 0, 12]} />
            </div>
          </div>
        </ViewAnimation>
      </Section>

      <div className="relative">
        <ViewAnimation
          initial={{ opacity: 0, translateY: -8 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          delay={0.4}
          viewport={{ once: true }}
        >
          <Gallery
            items={galleryItems.slice(0, 5)}
            bend={1}
            textColor="#000"
            borderRadius={0.05}
            className="absolute bottom-0 left-0 z-10 h-5/6 w-full md:h-5/6"
          />

          <Section className="relative flex h-[90svh] flex-col items-center gap-4 pt-6">
            <span className="font-mono text-3xl">Gallery</span>
            <span className="prose text-muted-foreground px-4 text-center text-sm">
              "A curated visual anthology capturing fragments and chronicles of my technological
              odyssey—showcasing endeavors in software craftsmanship, robotic ingenuity,
              collaborative ventures, and digital explorations."
            </span>
            <Link
              href="/gallery"
              className="text-muted-foreground z-[100] cursor-pointer font-mono text-sm transition-all duration-300 ease-in-out hover:scale-105 hover:text-black hover:underline"
            >
              Show More
            </Link>
          </Section>
        </ViewAnimation>
      </div>

      <Section className="relative flex h-[30svh] flex-col items-center gap-4 pt-6">
        <ViewAnimation
          initial={{ opacity: 0, translateY: -8 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          delay={0.6}
          viewport={{ once: true }}
        >
          <div className="relative flex flex-col items-center gap-4 pt-6">
            <span className="font-mono text-3xl">Contact</span>
            <span className="prose text-muted-foreground px-4 text-center text-sm">
              "Feel free to reach out for collaborations, inquiries, or just a friendly chat!"
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
    </>
  );
}
