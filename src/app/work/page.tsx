import HeroSection from '@/components/common/hero-section';
import WorkList from './components/work-list';

export default function Work() {
  return (
    <>
      <HeroSection
        title="Work"
        description="A compendium of inventive experiments, coded odysseys, and meticulously sculpted digital constructs reflecting my explorative forays into technological innovation."
      />

      <WorkList />
    </>
  );
}
