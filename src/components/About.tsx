// src/components/About.tsx

'use client';

// UPDATED: Removed imports no longer needed
import React, { useEffect, useRef, Suspense, lazy } from 'react';
import Image from 'next/image';
// REMOVED: CVModal
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
// REMOVED: All IconType and react-icons imports

gsap.registerPlugin(ScrollTrigger);

// Lazily import the 3D Model component
const SpaceStationModel = lazy(() => import('./SpaceStationModel'));

// REMOVED: Tab and TabButton component
// REMOVED: codeSnippets array
// REMOVED: The entire technologies array

// NEW: A lightweight placeholder component
const ModelPlaceholder: React.FC = () => {
  return (
    <div className="w-full h-[450px] flex items-center justify-center relative bg-black/20 rounded-lg">
      <Image
        src="/images/Desig.jpg" // Using this as placeholder per your file
        alt="Loading 3D Model"
        width={500}
        height={450}
        priority
        className="opacity-40 blur-sm"
      />
      <p className="absolute text-white/50">Loading Interactive Model...</p>
    </div>
  );
};


const About: React.FC = () => {
  // REMOVED: tab and isModalOpen state

  // === UPDATED: Refs for About Us sections ONLY ===
  const aboutUsSectionRef = useRef<HTMLDivElement | null>(null);
  const aboutUsTextRef = useRef<HTMLDivElement | null>(null);
  const modelCanvasRef = useRef<HTMLDivElement | null>(null);

  // REMOVED: Refs for About Founder
  // REMOVED: scrollerAnim ref

  useEffect(() => {

    // === 1. ABOUT US ANIMATION (Re-architected) ===
    const aboutUsSection = aboutUsSectionRef.current;
    const aboutUsText = aboutUsTextRef.current;
    const modelCanvas = modelCanvasRef.current;

    // Type guard for the "About Us" 2-column section
    if (aboutUsSection && aboutUsText && modelCanvas) {
      const aboutUsElements = [
        aboutUsText.querySelector('.sub-title'), // The h1
        ...gsap.utils.toArray(aboutUsText.querySelectorAll('p')) // All paragraphs
      ];

      // Set initial states
      gsap.set(modelCanvas, { opacity: 0, scale: 0.8, x: -50 }); // 3D model (from left)
      gsap.set(aboutUsElements, { opacity: 0, y: 40 }); // Text

      // Create the "About Us" timeline
      const tlAboutUs = gsap.timeline({
        scrollTrigger: {
          trigger: aboutUsSection,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      });

      // 1A: Animate the 3D model in
      tlAboutUs.to(modelCanvas, {
        opacity: 1,
        scale: 1,
        x: 0,
        duration: 1.2,
        ease: 'power3.out'
      });

      // 1B: Stagger the text in
      tlAboutUs.to(aboutUsElements, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.2
      }, "-=0.8");
    }

    // === 1.5 - Tech Scroller Animation (REMOVED) ===
    
    // === 2. ABOUT FOUNDER ANIMATION (REMOVED) ===

    // === 3. MAIN CLEANUP FUNCTION ===
    return () => {
      // REMOVED: Founder listeners
      // REMOVED: Scroller listeners
      
      gsap.killTweensOf([
        aboutUsSection, modelCanvas,
        ...gsap.utils.toArray(aboutUsText?.querySelectorAll('p, .sub-title') || [])
      ]);
    };

  }, []); // Run once on component mount

  return (
    <>
      <div id="about" className="py-20 text-dark-text">
        <div className="container mx-auto px-5">

          {/* ----- ABOUT US Section (RE-ARCHITECTED) ----- */}
          <div
            ref={aboutUsSectionRef}
            className="flex flex-col md:flex-row gap-12 md:gap-16 items-center mb-24"
          >
            {/* 1. 3D Model (On Left) */}
            <div ref={modelCanvasRef} className="w-full md:w-1/2">
              <Suspense fallback={<ModelPlaceholder />}>
                <SpaceStationModel />
              </Suspense>
            </div>

            {/* 2. Text Content (On Right) */}
            <div ref={aboutUsTextRef} className="flex-1">
              <h1 className="sub-title text-gradient-neon">About Us</h1>
              <p className="text-lg text-justify mb-4">
                As a premier service provider and software development organization, we are dedicated to delivering high-quality and innovative solutions tailored to meet our customers&apos; unique challenges.
              </p>
              <p className="text-justify mb-4">
                Our mission is to design and develop professional, top-tier software across various categories, empowering individuals and businesses to achieve their goals efficiently and effectively.
              </p>
              <p className="text-justify">
                We pride ourselves on our commitment to excellence, ensuring that every software product we create is robust, reliable, and user-friendly.
              </p>
            </div>
          </div>

          {/* 3. Tech Scroller (REMOVED) */}

          {/* ----- ABOUT FOUNDER Section (REMOVED) ----- */}

        </div>
      </div>

      {/* The Modal Component (REMOVED) */}
    </>
  );
};

export default About;