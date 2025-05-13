'use client';

import useImageAspectRatio from '@/hooks/use-image-aspect-ratio';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React, { useRef } from 'react';

interface WorkCardProps {
  title: string;
  description: string;
  images: string[];
  techStack: string[];
  demoLink?: string;
}

const WorkCard: React.FC<WorkCardProps> = ({ title, description, images, techStack, demoLink }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  // @ts-ignore
  const aspectRatio = useImageAspectRatio(imgRef);

  const isDesktopRatio = aspectRatio && aspectRatio > 1;
  const isSingle = images.length === 1;

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
    <div className="flex flex-col rounded-md p-4 pt-0 transition">
      <div className="bg-dashed group relative aspect-video rounded-2xl border border-neutral-300/20 bg-neutral-200/40 mask-b-from-100% transition duration-300 ease-in-out hover:bg-neutral-300">
        {images.map((src, index) => (
          <Image
            ref={imgRef}
            key={src}
            alt={title}
            width={isDesktopRatio ? (isSingle ? 650 : 450) : 250}
            height={isDesktopRatio ? (isSingle ? 650 : 450) : 200}
            src={src}
            className={cn(
              getCustomClassNames(index),
              'absolute transition duration-300 ease-in-out group-hover:scale-110 group-hover:shadow-2xl',
            )}
          />
        ))}
      </div>

      <h3 className="mb-1 font-mono text-xl font-semibold">{title}</h3>

      <p className="mb-2 text-gray-300">{description}</p>

      <div className="mb-2 flex flex-wrap gap-2">
        {techStack.map((tech) => (
          <span key={tech} className="rounded bg-gray-700 px-2 py-1 text-sm">
            {tech}
          </span>
        ))}
      </div>

      {demoLink && (
        <a
          href={demoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Lihat Demo
        </a>
      )}
    </div>
  );
};

export default WorkCard;
