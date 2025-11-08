// src/components/Hero.tsx

import React from 'react';

const Hero: React.FC = () => {
  return (
    <div 
      id="header" 
      // RESTORED: Parallax effect (bg-fixed) is here.
      className="w-full h-screen bg-hero-pattern bg-cover bg-center bg-fixed" 
    >
      
      {/* 1. REMOVE OVERLAY AND BLUR */}
      {/* Changed w-full h-full bg-black/50 flex items-center backdrop-blur-sm */}
      {/* The background is now fully transparent to show the image clearly. */}
      <div className="w-full h-full flex items-center bg-transparent"> 
        
        <div className="container mx-auto px-5">
          {/* TEXT SIZE FIX: Kept at text-5xl/text-8xl for bigger appearance */}
          <div className="mt-[20%] md:mt-[10%] text-5xl md:text-8xl"> 
            <h1 className="font-bold text-white"> {/* Ensure text is white for contrast */}
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