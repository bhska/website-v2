'use client';

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

const WorkList = () => {
  return (
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
                <div className="flex w-full flex-col justify-between gap-4 md:flex-row md:gap-0">
                  <div className="flex w-full flex-1">{work.title}</div>
                  <div className="flex flex-col justify-between gap-0 md:flex-row md:gap-10">
                    <div>{work.client}</div>
                    <div>{work.category}</div>
                    <div>{work.year}</div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="!duration-500">
                <WorkCard data={work} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>
    </ViewAnimation>
  );
};

export default WorkList;
