import { Section } from '@/components/common/section';
import { ViewAnimation } from '@/providers/view-animation';

export default function NotFound() {
  return (
    <Section>
      <ViewAnimation
        initial={{ opacity: 0, translateY: -8 }}
        whileInView={{ opacity: 1, translateY: 0 }}
        delay={0.2}
        viewport={{ once: true }}
      >
        <div className="flex min-h-[75svh] w-full grow flex-col items-center justify-center">
          <span className="mb-1 font-mono text-5xl font-medium">404</span>
          <span className="mb-4 font-mono text-lg font-medium">Page Not Found</span>
          <span className="text-sm">The page you are looking for does not exist.</span>
        </div>
      </ViewAnimation>
    </Section>
  );
}
