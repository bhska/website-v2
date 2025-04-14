import { ExpList } from './components/exp-list';
import HeroSection from '@/components/common/hero-section';

export default function Work() {
  return (
    <>
      <HeroSection
        title="Experience"
        description="An anthology of endeavors, technical articulations, and algorithmic craftsmanship manifesting my ventures into software orchestration, drone-centric robotics, and digital interface alchemy."
      />
      <ExpList />
    </>
  );
}
