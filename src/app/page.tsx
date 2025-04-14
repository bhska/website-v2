'use client';

import Gallery from '@/components/animations/gallery';
import Lanyard from '@/components/animations/lanyard';
import { Section } from '@/components/common/section';
import { ViewAnimation } from '@/providers/view-animation';

export default function Home() {
  return (
    <>
      <Section>
        <ViewAnimation
          initial={{ opacity: 0, translateY: -8 }}
          whileInView={{ opacity: 1, translateY: 0 }}
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
            </div>

            <div className="aspect-square">
              <Lanyard position={[1, 0, 12]} />
            </div>
          </div>
        </ViewAnimation>
      </Section>

      <div className="relative">
        <Gallery
          bend={1}
          textColor="#000"
          borderRadius={0.05}
          className="absolute bottom-0 left-0 z-10 h-3/4 w-full md:h-5/6"
        />

        <Section className="relative flex h-[80svh] flex-col items-center gap-4 pt-6">
          <span className="font-mono text-3xl">Gallery</span>
          <span className="prose text-muted-foreground px-4 text-center text-sm">
            "A curated visual anthology capturing fragments and chronicles of my technological
            odyssey—showcasing endeavors in software craftsmanship, robotic ingenuity, collaborative
            ventures, and digital explorations."
          </span>
        </Section>
      </div>
    </>
  );
}
