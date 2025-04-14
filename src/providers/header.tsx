'use client';

import { cn } from '@/lib/utils';
import { type HTMLAttributes, useEffect, useState } from 'react';

type HeaderProviderProps = HTMLAttributes<HTMLDivElement>;

export const HeaderProvider = ({ children, className }: HeaderProviderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    const throttledHandleScroll = () => requestAnimationFrame(handleScroll);

    window.addEventListener('scroll', throttledHandleScroll);

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, []);

  return <header className={cn(className)}>{children}</header>;
};
