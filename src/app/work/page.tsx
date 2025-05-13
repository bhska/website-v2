'use client';

import HeroSection from '@/components/common/hero-section';
import { Section } from '@/components/common/section';
import WorkCard from './work-item';
import { works } from '@/configs/work';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ViewAnimation } from '@/providers/view-animation';

export default function Work() {
  return (
    <>
      <HeroSection
        title="Work"
        description="A compendium of inventive experiments, coded odysseys, and meticulously sculpted digital constructs reflecting my explorative forays into technological innovation."
      />

      <ViewAnimation
        initial={{ opacity: 0, translateY: -4 }}
        whileInView={{ opacity: 1, translateY: 0 }}
        delay={0.4}
        viewport={{ once: true }}
      >
        <Section>
          <Accordion type="single" collapsible className="w-full">
            {works.map((work) => (
              <AccordionItem value={work.title} key={work.title}>
                <AccordionTrigger className="px-5 font-mono">
                  <div className="flex w-full justify-between">
                    <div className="flex w-full flex-1">{work.title}</div>
                    <div className="flex justify-between gap-10">
                      <div>{work.client}</div>
                      <div>{work.category}</div>
                      <div>{work.year}</div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="!duration-500">
                  <WorkCard
                    description={work.description}
                    images={work.images}
                    techStack={work.techStack}
                    title={work.title}
                    key={work.title}
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Section>
      </ViewAnimation>
    </>
  );
}
