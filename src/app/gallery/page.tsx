import SpotlightCard from '@/components/animations/spotlight-card';
import HeroSection from '@/components/common/hero-section';
import { Section } from '@/components/common/section';
import { galleryItems } from '@/configs/gallery';
import { ViewAnimation } from '@/providers/view-animation';
import Image from 'next/image';

export default function Gallery() {
  return (
    <>
      <HeroSection
        title="Gallery"
        description="A curated visual anthology capturing fragments and chronicles of my technological odyssey—showcasing endeavors in software craftsmanship, robotic ingenuity, collaborative ventures, and digital explorations."
      />

      <ViewAnimation
        initial={{ opacity: 0, translateY: -4 }}
        whileInView={{ opacity: 1, translateY: 0 }}
        delay={0.4}
        viewport={{ once: true }}
      >
        <Section>
          <div className="columns-1 gap-0 p-4 md:columns-2">
            {galleryItems.map((item) => (
              <SpotlightCard key={item.text} className="group" spotlightColor="rgba(0, 0, 0, 0.2)">
                <div
                  key={item.text}
                  className="relative flex flex-col grayscale transition duration-150 ease-in-out group-hover:scale-101 hover:grayscale-0"
                >
                  <Image src={item.image} alt={item.text} width={600} height={200} />
                  <div className="absolute top-0 right-0 bottom-0 left-0 z-50 flex items-end bg-black/20 p-4 transition duration-150 ease-in-out group-hover:bg-black/0">
                    <p className="text-sm text-white italic">{item.text}</p>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </Section>
      </ViewAnimation>
    </>
  );
}
