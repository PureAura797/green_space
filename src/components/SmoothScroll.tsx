'use client';

import { ReactNode } from 'react';

// For native trackpads (macbook, etc.), Javascript scroll hijacking (Lenis) 
// often fights with hardware inertia and causes massive input lag.
// We fall back to native smooth scrolling (scroll-smooth in HTML)
export default function SmoothScroll({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
