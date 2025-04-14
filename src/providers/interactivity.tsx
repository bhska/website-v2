import type React from 'react';
import ClickSpark from '@/components/animations/click-spark';

const InteractivityProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClickSpark sparkColor="#000" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
      {children}
    </ClickSpark>
  );
};

export default InteractivityProvider;
