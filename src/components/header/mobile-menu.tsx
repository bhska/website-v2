'use client';

import { cn } from '@/lib/utils';
import { atom, useAtom } from 'jotai';
import Link from 'next/link';
import { ActiveLink } from '../common/active-link';

import { navigation } from '@/configs/navigation';
import { Button } from '../ui/button';

export const mobileMenuOpen = atom(false);

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useAtom(mobileMenuOpen);

  return (
    <div
      className={cn(
        'fixed top-[53px] right-0 left-0 z-50 flex h-[calc(100vh-53px)] flex-col gap-4 p-4 md:p-8',
        'bg-backdrop/90 border-b px-4 py-2 backdrop-blur-md sm:top-[73px] sm:h-[calc(100vh-69px)]',
        isOpen ? 'flex' : 'hidden',
      )}
    >
      {navigation.map((link) => (
        <ActiveLink key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
          {link.label}
        </ActiveLink>
      ))}
      <Button variant="outline" asChild onClick={() => setIsOpen(false)}>
        <Link href="/contact">Get in touch</Link>
      </Button>
    </div>
  );
};
