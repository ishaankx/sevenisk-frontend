// src/components/Hero.tsx

import React from 'react';
// Note: Next.js Image component is not needed here as we are using CSS bg-fixed

const Hero: React.FC = () => {
  return (
    <div 
      id="header" 
      // RESTORED: w-full h-100vh is now h-screen. 
      // The critical bg-fixed class is back for the enveloping parallax effect.
      className="w-full h-screen bg-hero-pattern bg-cover bg-center bg-fixed" 
    >
      
      {/* This is the overlay. The bg-black/50 color is preserved. */}
      <div className="w-full h-full bg-black/50 flex items-center">
        
        <div className="container mx-auto px-5">
          <div className="mt-[20%] md:mt-[10%] text-4xl md:text-7xl">
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