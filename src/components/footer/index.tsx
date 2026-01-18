import { cn } from '@/lib/utils';
import { ViewAnimation } from '../../providers/view-animation';
import { Status } from './status';

export const Footer = () => (
  <footer
    className={cn(
      'container mx-auto flex max-w-5xl flex-col gap-4 border-x p-4',
      'sm:gap-16 sm:px-8 sm:py-8',
    )}
  >
    <div className="grid items-center justify-center gap-4 sm:grid-cols-2">
      <div className="flex w-full justify-center sm:justify-start">
        <ViewAnimation
          initial={{ opacity: 0, translateY: -8 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          delay={0.4}
        >
          <Status />
        </ViewAnimation>
      </div>
      <div className="flex justify-center sm:justify-end">
        <ViewAnimation
          initial={{ opacity: 0, translateY: -8 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          delay={0.8}
        >
          <p className="text-muted-foreground text-xs whitespace-nowrap md:text-sm">
            &copy; {new Date().getFullYear()} Bhaska. All rights reserved.
          </p>
        </ViewAnimation>
      </div>
    </div>
  </footer>
);
