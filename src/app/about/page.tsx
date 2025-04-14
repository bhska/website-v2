'use client';

import { Section } from '@/components/common/section';
import { ViewAnimation } from '@/providers/view-animation';
import { AboutMe } from './components/about-me';
import HeroSection from '@/components/common/hero-section';

export default function About() {
  return (
    <>
      <HeroSection
        title="About Me"
        description="A curated assemblage of reflections, annotations, and musings chronicling my odyssey through an existence richly embroidered with technological fascination, robotic pursuits, athletic diversions, and interface artistry."
      />
      <AboutMe />
    </>
  );
}
