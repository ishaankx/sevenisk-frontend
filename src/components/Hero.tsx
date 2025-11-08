// src/components/Hero.tsx

import React from 'react';
import Image from 'next/image'; // Import Next.js Image component

const Hero: React.FC = () => {
  return (
    // Change: Set container to relative and use h-screen for full height
    <div 
      id="header" 
      className="relative w-full h-screen overflow-hidden" // Removed bg-hero-pattern and related CSS
    >
      
      {/* 1. OPTIMIZED BACKGROUND IMAGE LAYER */}
      <Image
        // Using a high-quality file for the background
        src="/images/Designer.jpg"
        alt="SevenIsK Background"
        fill // Make image fill the parent div
        priority // Critical for LCP/fastest loading
        style={{ objectFit: 'cover' }} // Ensure image covers the area without distortion
        className="z-0 opacity-20" // Apply low opacity to the image itself
      />
      
      {/* 2. DARK OVERLAY (for text contrast) */}
      <div className="absolute inset-0 w-full h-full bg-black/50 z-10">
        
        {/* 3. HERO CONTENT */}
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
  );
};

export default Hero;