'use client';

import { Button } from '@/components/ui/button';
import { navigation } from '@/configs/navigation';
import { HeaderProvider } from '@/providers/header';
import Link from 'next/link';
import { ViewAnimation } from '../../providers/view-animation';
import { ActiveLink } from '../common/active-link';
import { MobileMenu } from './mobile-menu';
import { MobileMenuTrigger } from './mobile-menu-trigger';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Cross } from '../common/section';
import Logo from '@/assets/svgs/logo';

export const Header = () => {
  const pathname = usePathname();
  const active = pathname === '/';

  return (
    <>
      <HeaderProvider className="bg-backdrop/90 fixed top-0 right-0 left-0 z-50 container mx-auto flex max-w-5xl items-center justify-between border-x-0 border-b px-4 py-2 backdrop-blur-md transition-all sm:py-4 md:border-x md:border-b-0">
        <div className="w-32">
          <ViewAnimation
            initial={{ opacity: 0, translateY: -8 }}
            whileInView={{ opacity: 1, translateY: 0 }}
          >
            <Link
              href="/"
              aria-label="Muhammad Bhaska"
              className={cn(
                'group flex w-max items-center gap-2 px-2 py-1 text-black transition-all duration-100 ease-in-out hover:bg-black hover:text-white',
                active && 'bg-black text-white',
              )}
            >
              <Logo className="size-8" />

              <div className="hidden flex-col text-white group-hover:flex">
                <h2 className="font-mono text-xs font-medium">Muhammad</h2>
                <h2 className="-mt-1 font-mono text-xs font-medium">Bhaska</h2>
              </div>
            </Link>
          </ViewAnimation>
        </div>

        <nav className="hidden gap-6 md:flex">
          {navigation.map((link, index) => (
            <ViewAnimation
              key={link.href}
              initial={{ opacity: 0, translateY: -8 }}
              whileInView={{ opacity: 1, translateY: 0 }}
              delay={0.4 + index * 0.1}
            >
              <ActiveLink href={link.href}>{link.label}</ActiveLink>
            </ViewAnimation>
          ))}
        </nav>

        <div className="hidden w-32 justify-end md:flex">
          <ViewAnimation
            initial={{ opacity: 0, translateY: -8 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            delay={0.8}
          >
            <Button variant="outline" size="sm" asChild>
              <Link href="/contact" className="font-medium">
                Get in touch
              </Link>
            </Button>
          </ViewAnimation>
        </div>
        <div className="flex w-32 justify-end md:hidden">
          <ViewAnimation
            initial={{ opacity: 0, translateY: -8 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            delay={0.8}
          >
            <MobileMenuTrigger />
          </ViewAnimation>
        </div>
        <div className="absolute -bottom-3 -left-3 z-50 hidden h-6 sm:block">
          <Cross />
        </div>
        <div className="absolute -right-3 -bottom-3 z-50 hidden h-6 sm:block">
          <Cross />
        </div>
      </HeaderProvider>
      <MobileMenu />
    </>
  );
};
