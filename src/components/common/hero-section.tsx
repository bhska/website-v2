import { ViewAnimation } from '@/providers/view-animation';
import { Section } from './section';

interface HeroSectionProps {
  title: string;
  description: string;
}

const HeroSection = ({ title, description }: HeroSectionProps) => {
  return (
    <Section>
      <ViewAnimation
        initial={{ opacity: 0, translateY: -8 }}
        whileInView={{ opacity: 1, translateY: 0 }}
        delay={0.1}
        viewport={{ once: true }}
      >
        <div className="bg-dashed flex aspect-auto flex-col justify-center p-10 md:aspect-[16/3]">
          <h2 className="font-mono text-5xl font-medium">{title}</h2>

          <p className="prose mt-4 !w-full">{description}</p>
        </div>
      </ViewAnimation>
    </Section>
  );
};

export default HeroSection;
