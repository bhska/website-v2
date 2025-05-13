'use client';

import HeroSection from '@/components/common/hero-section';
import { Section } from '@/components/common/section';
import { ViewAnimation } from '@/providers/view-animation';
import { contact } from '@/resources';
import { ArrowUpRight } from 'lucide-react';
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
          className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2"
        >
          {contact.length > 0 &&
            contact.map(
              (item) =>
                item.link && (
                  <Link
                    target="_blank"
                    href={item.link}
                    className="group hover:bg-dashed flex items-center justify-between border border-neutral-200/50 p-6 transition duration-150 ease-in-out"
                    key={item.name}
                  >
                    <div className="w-fit p-1 px-2 transition duration-150 ease-linear group-hover:bg-white">
                      {item.name}
                    </div>

                    <ArrowUpRight className="text-muted-foreground hidden transition duration-150 ease-in-out group-hover:flex" />
                  </Link>
                ),
            )}
        </ViewAnimation>
      </Section>
    </>
  );
}
