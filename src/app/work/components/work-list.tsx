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
import { Skeleton } from '@/components/ui/skeleton';
import { ViewAnimation } from '@/providers/view-animation';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

const WorkListContent = () => {
  const searchParams = useSearchParams();
  const projectTitle = searchParams.get('project');
  const [value, setValue] = useState<string | undefined>(undefined);

  // Effect to handle URL parameter changes and set the accordion value
  useEffect(() => {
    if (projectTitle) {
      // Decode the URL component to match the work title exactly
      // The searchParams.get() already does decoding, but we ensure it matches
      const decodedTitle = decodeURIComponent(projectTitle);

      // Verify the project exists before setting it
      const projectExists = works.some((w) => w.title === decodedTitle);

      if (projectExists) {
        setValue(decodedTitle);

        // Optional: scroll to the element after a short delay to allow accordion to open
        setTimeout(() => {
          const element = document.getElementById(`work-${decodedTitle}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);
      }
    }
  }, [projectTitle]);

  return (
    <ViewAnimation
      initial={{ opacity: 0, translateY: -4 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      delay={0.4}
      viewport={{ once: true }}
    >
      <Section>
        <Accordion
          type="single"
          collapsible
          className="w-full"
          value={value}
          onValueChange={setValue}
        >
          {works.map((work) => (
            <AccordionItem value={work.title} key={work.title} id={`work-${work.title}`}>
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

const WorkList = () => {
  return (
    <Suspense
      fallback={
        <Section>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col gap-4 border-b pb-4">
                <Skeleton className="h-8 w-full" />
                <div className="flex justify-between gap-10">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            ))}
          </div>
        </Section>
      }
    >
      <WorkListContent />
    </Suspense>
  );
};

export default WorkList;
