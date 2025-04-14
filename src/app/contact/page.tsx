'use client';

import Dither from '@/components/animations/dither';
import HeroSection from '@/components/common/hero-section';
import { Cross, Section } from '@/components/common/section';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ViewAnimation } from '@/providers/view-animation';
import { contact } from '@/resources';
import Link from 'next/link';

export default function Contact() {
  return (
    <>
      <HeroSection
        title="Contact"
        description="A digital conduit facilitating seamless discourse, collaboration overtures, and exchanges of inventive ideations—bridging connections beyond mere keystrokes."
      />

      <Section>
        <ViewAnimation
          initial={{ opacity: 0, translateY: -4 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          delay={0.4}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2"
        >
          {contact.length > 0 &&
            contact.map(
              (item) =>
                item.link && (
                  <div className="p-6 hover:bg-neutral-300 hover:text-white" key={item.name}>
                    <Link href={item.link}>{item.name}</Link>
                  </div>
                ),
            )}
        </ViewAnimation>
      </Section>
    </>
  );
}
