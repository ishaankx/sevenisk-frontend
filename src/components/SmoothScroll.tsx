// src/components/SmoothScroll.tsx

'use client';

import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      lerp: 0.1, // Controls the "smoothness". 0.1 is a good default.
      smoothWheel: true,
    });

    // This function will run on every animation frame
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;