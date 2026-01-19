'use client';

import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

interface WorkCardProps {
  data: {
    title: string;
    description: string;
    images?: string[];
    techStack: string[];
    client: string;
    category: string;
    year: string;
    url?: string;
  };
}

interface ImageDimension {
  width: number;
  height: number;
  loaded: boolean;
}

const PORTRAIT_MIN_RATIO = 0.4;
const PORTRAIT_MAX_RATIO = 1;
const PORTRAIT_HEIGHT = 350;
const LANDSCAPE_HEIGHT = 300;

const isPortraitRatio = (width: number, height: number): boolean => {
  const ratio = width / height;
  return ratio >= PORTRAIT_MIN_RATIO && ratio < PORTRAIT_MAX_RATIO;
};

const WorkCard: React.FC<WorkCardProps> = ({
  data: { title, description, images, techStack, client, category, year, url },
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageDimensions, setImageDimensions] = useState<Record<string, ImageDimension>>({});
  const isMobile = useIsMobile();
  const plugin = React.useRef(Autoplay({ delay: 3000, stopOnInteraction: false, jump: false }));

  const imageList = images ?? [];
  const isEmpty = imageList.length === 0;
  const isSingleImage = imageList.length === 1;

  const handleImageLoad = (src: string, e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setImageDimensions((prev) => ({
      ...prev,
      [src]: {
        width: img.naturalWidth,
        height: img.naturalHeight,
        loaded: true,
      },
    }));
  };

  const getIsPortrait = (): boolean => {
    if (imageList.length === 0) return false;
    const firstImg = imageList[0];
    const dim = imageDimensions[firstImg];
    if (dim && dim.loaded) {
      return isPortraitRatio(dim.width, dim.height);
    }
    return false;
  };

  const isPortrait = getIsPortrait();
  const showTwoImages = isPortrait && !isMobile && imageList.length >= 2;
  const containerHeight = isPortrait ? PORTRAIT_HEIGHT : LANDSCAPE_HEIGHT;

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setActiveIndex(api.selectedScrollSnap());
    };

    api.on('select', onSelect);
    api.on('reInit', onSelect);

    setActiveIndex(api.selectedScrollSnap());

    return () => {
      api.off('select', onSelect);
      api.off('reInit', onSelect);
    };
  }, [api]);

  return (
    <div className="flex flex-col rounded-md p-4 py-0">
      {isEmpty ? (
        <div className="flex min-h-[200px] w-full items-center justify-center rounded-2xl border border-neutral-300/20 bg-neutral-200/40">
          <p className="text-sm text-neutral-500">
            No photos added yet. Due to NDA or will be updated periodically.
          </p>
        </div>
      ) : (
        <Carousel
          className="w-full"
          plugins={[plugin.current]}
          opts={{
            align: 'start',
            loop: true,
          }}
          setApi={setApi}
        >
          <div
            className={cn(
              'relative rounded-2xl border border-neutral-300/20 bg-neutral-200/40',
              isMobile ? 'px-8 py-4' : 'px-12 py-6',
            )}
          >
            <CarouselContent className="-ml-4">
              {imageList.map((src) => {
                return (
                  <CarouselItem
                    key={src}
                    className={cn('pl-4', showTwoImages ? 'basis-1/2' : 'basis-full')}
                  >
                    <div
                      className="relative overflow-hidden rounded-lg"
                      style={{ height: `${containerHeight}px` }}
                    >
                      <Image
                        alt={`${title} - ${src.split('/').pop()}`}
                        src={src}
                        fill
                        className="object-contain"
                        sizes={showTwoImages ? '50vw' : '100vw'}
                        onLoad={(e) => handleImageLoad(src, e)}
                      />
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>

            {!isSingleImage && (
              <>
                <CarouselPrevious className="top-1/2 left-2 -translate-y-1/2" />
                <CarouselNext className="top-1/2 right-2 -translate-y-1/2" />
              </>
            )}

            <div className="mt-3 flex justify-center gap-2">
              {imageList.map((src, index) => (
                <div
                  key={src}
                  className={cn(
                    'h-1.5 w-1.5 rounded-full transition-[width,background-color] duration-200',
                    index === activeIndex ? 'w-3 bg-neutral-700' : 'bg-neutral-400',
                  )}
                />
              ))}
            </div>
          </div>
        </Carousel>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {techStack.map((tech) => (
          <span key={tech} className="rounded-full bg-neutral-200 px-2 py-1 text-xs">
            {tech}
          </span>
        ))}
      </div>

      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-blue-500 hover:underline"
        >
          Visit Project
        </a>
      )}
    </div>
  );
};

export default WorkCard;
