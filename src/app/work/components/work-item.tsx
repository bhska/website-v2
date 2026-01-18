'use client';

import useImageAspectRatio from '@/hooks/use-image-aspect-ratio';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React, { useRef } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

interface WorkCardProps {
  data: {
    title: string;
    description: string;
    images: string[];
    techStack: string[];
    client: string;
    category: string;
    year: string;
    url?: string;
  };
}

const WorkCard: React.FC<WorkCardProps> = ({
  data: { title, description, images, techStack, client, category, year, url },
}) => {
  const imgRef = useRef<HTMLImageElement>(null!);
  const aspectRatio = useImageAspectRatio(imgRef);

  const isDesktopRatio = aspectRatio && aspectRatio > 1;
  const isSingleImage = images.length === 1;
  const isMobile = useIsMobile();
  const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true, jump: false }));

  const getCustomClassNames = (index: number) => {
    switch (images.length) {
      case 1:
        return cn(
          isDesktopRatio
            ? '-bottom-5 left-0 right-0 mx-auto rotate-0 group-hover:-rotate-3'
            : '-bottom-5 left-0 right-0 mx-auto rotate-0 group-hover:-rotate-3',
        );
      case 2:
        return imagesStyle2(index);
      case 3:
        return imagesStyle3(index);
      default:
        return '';
    }
  };

  const imagesStyle2 = (index: number) => {
    switch (index) {
      case 0:
        return cn(
          isDesktopRatio
            ? 'top-1/2 right-0 -translate-y-1/2 rotate-8 group-hover:-rotate-12'
            : 'top-3/4 right-40 -translate-y-1/2 rotate-8 group-hover:-rotate-12',
        );
      case 1:
        return cn(
          isDesktopRatio
            ? 'top-1/2 left-0 -translate-y-1/2 -rotate-8 group-hover:-rotate-12'
            : 'top-1/4 left-40 -translate-y-1/2 -rotate-8 group-hover:-rotate-12',
        );
      default:
        return '';
    }
  };

  const imagesStyle3 = (index: number) => {
    switch (index) {
      case 0:
        return cn(
          isDesktopRatio
            ? '-bottom-5 -left-5 rotate-6 group-hover:-rotate-12'
            : '-bottom-5 left-10 -rotate-3 group-hover:-rotate-12',
        );
      case 1:
        return cn(
          isDesktopRatio
            ? '-top-10 right-0 left-0 mx-auto rotate-6 group-hover:-rotate-12'
            : '-top-10 right-0 left-0 mx-auto rotate-6 group-hover:-rotate-12',
        );
      case 2:
        return cn(
          isDesktopRatio
            ? 'right-5 -bottom-10 -rotate-12 group-hover:-rotate-12'
            : 'right-5 -bottom-10 -rotate-12 group-hover:-rotate-12',
        );
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-col rounded-md p-4 py-0 transition">
      {isMobile ? (
        <Carousel
          className="w-full max-w-xs"
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <div className="bg-dashed flex items-center justify-center rounded-2xl border border-neutral-300/20 p-5">
            <CarouselContent>
              {images.map((src, index) => (
                <CarouselItem key={src}>
                  <Image
                    ref={imgRef}
                    alt={`${title} project screenshot ${index + 1}`}
                    width={isDesktopRatio ? (isSingleImage ? 650 : 450) : 250}
                    height={isDesktopRatio ? (isSingleImage ? 650 : 450) : 200}
                    src={src}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </div>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <div
          className={cn(
            'bg-dashed group relative rounded-2xl border border-neutral-300/20 bg-neutral-200/40 mask-b-from-100% transition duration-300 ease-in-out hover:bg-neutral-300',
            isSingleImage ? 'aspect-[16/6]' : 'aspect-video',
          )}
        >
          {images.map((src, index) => (
            <Image
              ref={imgRef}
              key={src}
              alt={`${title} project screenshot ${index + 1}`}
              width={isDesktopRatio ? (isSingleImage ? 650 : 450) : 250}
              height={isDesktopRatio ? (isSingleImage ? 650 : 450) : 200}
              src={src}
              className={cn(
                getCustomClassNames(index),
                'absolute transition duration-300 ease-in-out group-hover:scale-110 group-hover:shadow-2xl',
              )}
            />
          ))}
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {techStack.map((tech) => (
          <span key={tech} className="rounded-full bg-neutral-200 px-2 py-1 text-xs">
            {tech}
          </span>
        ))}
      </div>

      {/* <h3 className="mb-1 font-mono text-xl font-semibold">{title}</h3> */}

      {/* <div className="flex w-full flex-col justify-between gap-0 md:flex-row md:gap-10">
        <div>{client}</div>
        <div>{category}</div>
        <div>{year}</div>
      </div> */}

      {/* <p className="mb-2 text-gray-300">{description}</p> */}

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
