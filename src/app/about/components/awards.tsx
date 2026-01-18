'use client';

import { Section } from '@/components/common/section';
import { awards } from '@/configs/awards';
import { ViewAnimation } from '@/providers/view-animation';

const Awards = () => {
  return (
    <Section>
      <ViewAnimation
        initial={{ opacity: 0, translateY: -8 }}
        whileInView={{ opacity: 1, translateY: 0 }}
        viewport={{ once: true }}
      >
        <div className="w-full">
          <div className="border-b px-6 py-6 font-mono md:px-8">
            <h2 className="text-3xl font-medium text-balance">Awards & Recognition</h2>
            <p className="text-muted-foreground mt-1 max-w-[600px] text-sm text-pretty">
              Honors received for contributions in design, development, and open source.
            </p>
          </div>

          <div className="w-full">
            {awards.map((award, index) => (
              <ViewAnimation
                key={`${award.title}-${award.year}`}
                initial={{ opacity: 0, translateY: 12 }}
                whileInView={{ opacity: 1, translateY: 0 }}
                viewport={{ once: true }}
                delay={index * 0.1}
              >
                <div className={`group transition-colors hover:bg-neutral-50 ${index !== awards.length - 1 ? 'border-b' : ''}`}>
                  <div className="flex w-full flex-col justify-between px-6 py-5 md:flex-row md:items-center md:px-8">
                    <div className="flex flex-1 flex-col gap-2 md:flex-row md:items-center md:gap-8">
                      <div className="flex-1 font-mono text-sm md:text-base">{award.title}</div>
                      <div className="flex flex-col justify-end gap-1 md:w-[40%] md:flex-row md:items-center md:gap-8">
                        <div className="text-muted-foreground font-mono text-xs md:text-sm text-end">
                          {award.organization}
                        </div>
                        <div className="text-muted-foreground font-mono text-xs tabular-nums md:text-sm">
                          {award.year}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ViewAnimation>
            ))}
          </div>
        </div>
      </ViewAnimation>
    </Section>
  );
};

export default Awards;
