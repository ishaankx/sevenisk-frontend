// src/components/SmoothScroll.tsx
"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 1. Register the GSAP plugin ONCE here.
gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => 1 - Math.pow(1 - t, 3), // easeOutCubic
      smoothWheel: true,
    });

    // ----- GSAP + Lenis Integration -----

    // 2. Tell ScrollTrigger to use Lenis's scroll event
    lenis.on('scroll', ScrollTrigger.update);

    // 3. Define the ticker callback function WITH a persistent reference
    const tickerCallback = (time: number) => {
      // lenis.raf expects milliseconds, GSAP ticker provides seconds
      lenis.raf(time * 1000);
    };

    // 4. Add the callback to GSAP's ticker
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // ------------------------------------

    lenis.scrollTo(0, { immediate: true });

    // Cleanup on component unmount
    return () => {
      // 5. Use the SAME function reference to remove the ticker
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}