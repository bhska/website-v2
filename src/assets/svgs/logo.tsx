import type * as React from 'react';

const Logo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={360}
    height={226}
    viewBox="0 0 360 226"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M106.5 0L0 226H245.5L359.5 0L183.5 48L106.5 0ZM52.5 198.5L107.948 79.5H271.5L200.495 136.604L216.052 198.5H52.5Z"
      fill="currentColor"
    />
  </svg>
);

export default Logo;
