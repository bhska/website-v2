'use client';

import { ViewAnimation } from '@/providers/view-animation';
import { Section } from '../../../components/common/section';
import { achievement } from '@/configs/achievement';
import Image from 'next/image';
import useNextBlurhash from 'use-next-blurhash';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';

const Achievement = () => {
  const [blurDataUrl] = useNextBlurhash('LDP?]y~q00jZ4o?aIUWB00soxuR*');

  return (
    <Section className="!border-r-0 !border-b-0">
      <ViewAnimation
        initial={{ opacity: 0, translateY: -8 }}
        whileInView={{ opacity: 1, translateY: 0 }}
        delay={0.2}
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-dashed flex h-full w-full flex-col border-b p-6 md:aspect-square md:border-r md:border-b-0 md:p-10">
            <div className="sticky top-28">
              <h2 className="font-mono text-3xl font-medium sm:text-4xl md:text-5xl">
                Certificates
              </h2>

              <p className="prose mt-4">
                An ambitious scholar and lifelong learner, dedicated to the pursuit of personal and
                academic achievement.
              </p>
            </div>
          </div>

          {/* Desktop: Grid layout */}
          <div className="hidden w-full columns-2 gap-0 !border-b-0 last:border-r md:block">
            {achievement.map((item) => (
              <div className="group relative flex h-auto w-full flex-col" key={item.title}>
                <div className="bg-dashed flex justify-center object-none p-6">
                  {item.image && (
                    <Image
                      src={item.image}
                      width={600}
                      height={300}
                      alt={item.title}
                      blurDataURL={blurDataUrl}
                      className="grayscale transition duration-200 ease-in-out group-hover:scale-101 group-hover:rotate-3 group-hover:shadow-md group-hover:grayscale-0"
                    />
                  )}
                </div>

                <div className="z-10 flex w-full flex-col justify-center p-4 text-center transition duration-200 ease-in-out group-hover:bg-white">
                  <span className="w-full text-center text-sm">{item.title}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: Carousel layout */}
          <div className="block w-full px-6 py-8 md:hidden">
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2">
                {achievement.map((item) => (
                  <CarouselItem key={item.title} className="basis-[85%] pl-2">
                    <div className="group relative flex h-auto w-full flex-col">
                      <div className="bg-dashed flex justify-center rounded-lg p-4">
                        {item.image && (
                          <Image
                            src={item.image}
                            width={600}
                            height={300}
                            alt={item.title}
                            blurDataURL={blurDataUrl}
                            className="rounded"
                          />
                        )}
                      </div>

                      <div className="flex w-full flex-col justify-center py-3 text-center">
                        <span className="w-full text-center text-sm font-medium">{item.title}</span>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="mt-4 flex justify-center gap-2">
                <CarouselPrevious className="static translate-y-0" />
                <CarouselNext className="static translate-y-0" />
              </div>
            </Carousel>
          </div>
        </div>
      </ViewAnimation>
    </Section>
  );
};

export default Achievement;
