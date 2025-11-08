import React from 'react';

const Hero: React.FC = () => {
  return (
    <div id="header" className="w-full h-100vh bg-hero-pattern bg-cover bg-center bg-fixed">
      
      {/* This is the overlay. 
        The class is now 'bg-black/50' (v4 syntax) instead of 'bg-black bg-opacity-50' (v3 syntax).
        This will make the overlay 50% transparent, and your background image will show through.
      */}
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