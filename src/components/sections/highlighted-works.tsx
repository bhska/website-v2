'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Section } from '@/components/common/section';
import { works } from '@/configs/work';
import { ViewAnimation } from '@/providers/view-animation';
import { cn } from '@/lib/utils';

// Helper to get highlighted works (filtering for those with images)
const highlightedWorks = works.filter((work) => work.images && work.images.length > 0).slice(0, 3);

export function HighlightedWorks({
  className,
  showLink = true,
}: {
  className?: string;
  showLink?: boolean;
}) {
  return (
    <Section className={cn('px-6 py-12 md:px-8', className)}>
      <div className="flex flex-col gap-8">
        <ViewAnimation
          initial={{ opacity: 0, translateY: -8 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between px-1"
        >
          <div className="space-y-1">
            <h2 className="font-mono text-3xl font-medium text-balance">Highlighted Work</h2>
            <p className="text-muted-foreground max-w-[600px] text-sm text-pretty">
              Selected projects showcasing my expertise in building digital experiences.
            </p>
          </div>
          {showLink && (
            <Link
              href="/work"
              className="text-muted-foreground hover:text-foreground hidden font-mono text-sm underline-offset-4 transition-colors hover:underline sm:block"
            >
              View all works
            </Link>
          )}
        </ViewAnimation>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {highlightedWorks.map((work, index) => (
            <ViewAnimation
              key={work.title}
              initial={{ opacity: 0, translateY: 12 }}
              whileInView={{ opacity: 1, translateY: 0 }}
              viewport={{ once: true }}
              delay={index * 0.1 + 0.2}
              className="group flex cursor-pointer flex-col gap-3"
            >
              <Link
                href={`/work?project=${encodeURIComponent(work.title)}`}
                className="block space-y-3"
              >
                <div className="bg-muted relative aspect-video overflow-hidden border">
                  {work.images && work.images[0] && (
                    <Image
                      src={work.images[0]}
                      alt={work.title}
                      fill
                      className="object-cover object-top grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  )}
                </div>

                <div className="flex items-start justify-between gap-4 px-1">
                  <h3 className="font-mono text-lg leading-tight font-medium decoration-1 underline-offset-4 group-hover:underline">
                    {work.title}
                  </h3>
                  <div className="text-muted-foreground pt-1 font-mono text-xs whitespace-nowrap tabular-nums">
                    {work.year}
                  </div>
                </div>
              </Link>
            </ViewAnimation>
          ))}
        </div>

        {showLink && (
          <div className="mt-4 flex justify-center sm:hidden">
            <Link
              href="/work"
              className="text-muted-foreground hover:text-foreground font-mono text-sm underline-offset-4 transition-colors hover:underline"
            >
              View all works
            </Link>
          </div>
        )}
      </div>
    </Section>
  );
}
