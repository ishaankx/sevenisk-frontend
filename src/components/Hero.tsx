// src/components/Hero.tsx

import React from 'react';
import Image from 'next/image';

const Hero: React.FC = () => {
  const HD_IMAGE = "/images/b.jpg"; // Your high-resolution background image
  const LQIP_IMAGE = "/images/bSmall.jpg"; // Your low-quality placeholder

  return (
    <>
      {/* 1. FIXED, OPTIMIZED BACKGROUND LAYER */}
      {/* This layer is fixed to the viewport, spans the whole screen, and is behind all content (z-0). */}
      <div className="fixed top-0 left-0 w-screen h-screen z-0 pointer-events-none">
        <Image
          src={HD_IMAGE}
          alt="SevenIsK Background"
          fill 
          priority // Ensures fast LCP loading
          style={{ objectFit: 'cover' }}
          className="opacity-20" // Apply low opacity to the image itself
          
          // Progressive Loading (LQIP)
          placeholder="blur" 
          blurDataURL={LQIP_IMAGE} 
        />
      </div>

      {/* 2. SCROLLING CONTENT CONTAINER (The Hero section itself) */}
      {/* This container defines the height of the first section (h-screen) and has a transparent background. */}
      <div 
        id="header" 
        className="relative w-full h-screen bg-transparent" // Use h-screen and transparent background
      >
        
        {/* 3. SCROLLING DARK OVERLAY (for text contrast) */}
        {/* The scrolling overlay/content must be in front of the image (z-10). */}
        <div className="absolute inset-0 w-full h-full bg-black/50 z-10">
          
          {/* 4. HERO CONTENT (Text) */}
          <div className="container mx-auto px-5 h-full flex items-center">
            <div className="text-white mt-[20%] md:mt-[10%] text-4xl md:text-7xl relative z-20">
              <h1 className="font-bold">
                We Build The<br />
                <span className="text-brand-teal">Quality</span> Softwares
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;