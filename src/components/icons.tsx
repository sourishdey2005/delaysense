import type { SVGProps } from 'react';

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="m9.09 9.91 3.28-3.28a2.11 2.11 0 1 1 2.99 2.99l-3.28 3.28" />
      <path d="m14.91 14.09-3.28 3.28a2.11 2.11 0 1 1-2.99-2.99l3.28-3.28" />
    </svg>
  ),
};
