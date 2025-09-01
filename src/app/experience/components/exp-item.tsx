'use client';

import { Section } from '@/components/common/section';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ViewAnimation } from '@/providers/view-animation';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

export interface ExpItemProps {
  status: string[];
  period: string;
  position?: 'normal' | 'reverse';
  title: string;
  description: string | React.ReactNode;
  image: string | StaticImageData;
  link?: string;
  role: string;
  items?: React.ReactNode[];
}

export default function ExpItem({
  status,
  period,
  position = 'normal',
  title,
  description,
  image,
  role,
  link,
}: ExpItemProps) {
  return (
    <Section className="grid items-start border-none lg:grid-cols-2">
      <div className={position === 'normal' ? 'lg:order-last' : 'lg:order-first'}>
        <ViewAnimation
          initial={{ opacity: 0, translateY: -4 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          delay={0.2}
          viewport={{ once: true }}
          className={cn('flex h-full flex-col items-start justify-between gap-4 p-6', 'sm:p-8')}
        >
          <div className="flex flex-col gap-2">
            <span className="prose [&_a]:no-underline">{description}</span>
          </div>
        </ViewAnimation>
      </div>
      <div
        className={cn(
          'bg-dashed size-full p-8 pb-0',
          position === 'normal' ? 'lg:order-first' : 'lg:order-last',
        )}
      >
        <ViewAnimation
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          delay={0.3}
          viewport={{ once: true }}
          className="size-full"
        >
          <div className="sticky top-24 flex flex-col gap-4 pb-8 md:flex-row md:items-center">
            <div className="relative flex aspect-square size-24 items-center justify-center">
              <Image src={image} width="300" height="300" alt={title} className="size-max" />
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xl font-medium">{title}</span>
              <small className="text-muted-foreground">{role}</small>
              <span className="text-xs">{period}</span>

              <div className="text-muted-foreground flex gap-2">
                {status.map((item) => (
                  <Badge key={item} className="bg-foreground border capitalize">
                    {item}
                  </Badge>
                ))}
              </div>

              <a href={link} target='_blank' className="hover:underline transition transition-all">Visit</a>
            </div>
          </div>
        </ViewAnimation>
      </div>
    </Section>
  );
}
