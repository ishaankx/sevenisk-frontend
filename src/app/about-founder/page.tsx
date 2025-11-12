// src/app/about-founder/page.tsx

'use client';

// All the imports and logic from the "About Founder" section
import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import Image from 'next/image';
import CVModal from '@/components/CVModal'; // Adjusted path
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Typewriter from 'typewriter-effect';

// NEW: Import social icons
import { FaLinkedin, FaGithub, FaXTwitter, FaEnvelope } from 'react-icons/fa6';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

// NEW: Lazily import the 3D Model component
const ParticlesBackground = lazy(() => import('@/components/ParticlesBackground'));

// --- Tab Button Component (Copied from About.tsx) ---
type Tab = 'skills' | 'expereince' | 'education';

interface TabButtonProps {
  active: boolean;
  selectTab: () => void;
  children: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ active, selectTab, children }) => {
  const buttonClasses = active
    ? 'text-white border-b-2 border-brand-teal'
    : 'text-dark-text';

  return (
    <button onClick={selectTab}>
      <p className={`mr-6 font-semibold ${buttonClasses} transition-all`}>
        {children}
      </p>
    </button>
  );
};

// --- YOUR NEW Code Snippets Logic ---
const singleLineOfCode = "const{dev}=sevenisk; await.getProfile('ishaan'); model.predict(input); docker.build(sevenisk); kubectl-apply-f;";
const snippetChunks = singleLineOfCode.split(' '); // Split by space

const numSnippets = snippetChunks.length;
const radius = 120; // The width of the spiral
const minY = -150; // The bottom of the spiral
const maxY = 150; // The top of the spiral
const yRange = maxY - minY; // Total height
const yStep = yRange / numSnippets; // Vertical space between snippets

const codeSnippets = Array.from({ length: numSnippets }).map((_, i) => {
  const angle = (i / numSnippets) * Math.PI * 2; // Angle in radians
  const yPos = maxY - i * yStep; // Staggered Y position
  
  return {
    text: snippetChunks[i], // Use the word from the single line
    x: Math.cos(angle) * radius,
    y: yPos,
    z: Math.sin(angle) * radius,
    angle: angle, // <-- We still store the angle
  };
});


// NEW: Social Links Array
const socialLinks = [
  { name: 'LinkedIn', icon: FaLinkedin, href: 'https://www.linkedin.com/in/ishaan-katara-399a83233/' },
  { name: 'GitHub', icon: FaGithub, href: 'https://github.com/ishaankx' },
  { name: 'Email', icon: FaEnvelope, href: 'mailto:ishaankatara@gmail.com' },
  { name: 'Twitter', icon: FaXTwitter, href: 'https://x.com/ishaankatara' },
];

// --- Main Page Component ---
const AboutFounderPage: React.FC = () => {
  const [tab, setTab] = useState<Tab>('skills');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  const [prefix, setPrefix] = useState("I am a");

  // Refs for About Founder (Wizard Effect)
  const mainContainerRef = useRef<HTMLDivElement | null>(null);
  const imageElRef = useRef<HTMLDivElement | null>(null);
  const snippetWrapperRef = useRef<HTMLDivElement | null>(null);
  const snippetTiltWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let snippets: HTMLElement[] = [];
    const mainContainer = mainContainerRef.current;
    const image = imageElRef.current;
    const orbitWrapper = snippetWrapperRef.current;
    const tiltWrapper = snippetTiltWrapperRef.current;

    // --- Mouse Listeners for Wizard Effect ---
    const handleFounderMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      if (!mainContainer) return;
      const { offsetWidth, offsetHeight, offsetLeft, offsetTop } = mainContainer;
      const xPos = clientX - (offsetLeft + offsetWidth / 2);
      const yPos = clientY - (offsetTop + offsetHeight / 2);
      const rotateY = gsap.utils.mapRange(-offsetWidth / 2, offsetWidth / 2, -10, 10, xPos);
      const rotateX = gsap.utils.mapRange(-offsetHeight / 2, offsetHeight / 2, 10, -10, yPos);

      gsap.to(image, {
        rotateX: rotateX * 0.5, rotateY: rotateY * 0.5,
        duration: 0.7, ease: 'power1.out',
      });
      gsap.to(tiltWrapper, {
        rotateX: rotateX * 1.2, rotateY: rotateY * 1.2,
        duration: 0.7, ease: 'power1.out',
      });
    };

    const handleFounderMouseLeave = () => {
      gsap.to(image, { rotateX: 0, rotateY: 0, duration: 1, ease: 'power1.out' });
      gsap.to(tiltWrapper, { rotateX: 0, rotateY: 0, duration: 1, ease: 'power1.out' });
    };

    if (mainContainer && image && orbitWrapper && tiltWrapper) {
      snippets = gsap.utils.toArray<HTMLElement>('.code-snippet');
      // No ScrollTrigger here, just animate in
      gsap.set(mainContainer, { opacity: 0, y: 50, scale: 0.9, rotateX: -10 });
      gsap.set(snippets, { opacity: 0 });

      const tlFounder = gsap.timeline({ delay: 0.2 }); // Animate in on page load

      tlFounder.to(mainContainer, {
        opacity: 1, y: 0, scale: 1, rotateX: 0,
        duration: 1.2, ease: 'power3.out',
      }, 0);
      tlFounder.to(image, {
        y: -15, duration: 2.5, ease: 'power1.inOut',
        yoyo: true, repeat: -1,
      }, 0.5);
      
      // This is the "swirl" (unchanged)
      tlFounder.to(orbitWrapper, {
        rotateY: 360, duration: 20,
        ease: 'none', repeat: -1,
      }, 0.5);
      
      const yWrap = gsap.utils.wrap(minY, maxY); // Creates a wrap function
      const spiralDuration = 10; // 10 seconds to travel the full height

      snippets.forEach((snippet, i) => {
        const s = codeSnippets[i];
        if (!s) return; // Safety check
        
        // --- Set initial position AND rotation ---
        gsap.set(snippet, { 
          x: s.x, 
          y: s.y, 
          z: s.z,
          // This rotates the snippet to "face the center"
          rotateY: (s.angle * (180 / Math.PI)) - 90 
        });
        
        // Fade in
        tlFounder.to(snippet, {
          opacity: 0.9, duration: 1, ease: 'power2.out',
        }, 0.8);
        
        // --- Continuous Upward Spiral Animation (Unchanged) ---
        gsap.to(snippet, {
          y: `-=${yRange}`, // Move up by the total height (300px)
          duration: spiralDuration,
          ease: 'none',
          repeat: -1,
          delay: -(spiralDuration * (s.y - minY) / yRange),
          modifiers: {
            y: (y) => yWrap(parseFloat(y))
          }
        });
      });

      tlFounder.call(() => {
        mainContainer.addEventListener('mousemove', handleFounderMouseMove);
        mainContainer.addEventListener('mouseleave', handleFounderMouseLeave);
      });
    }

    // --- Cleanup Function ---
    return () => {
      if (mainContainer) {
        mainContainer.removeEventListener('mousemove', handleFounderMouseMove);
        mainContainer.removeEventListener('mouseleave', handleFounderMouseLeave);
      }
      gsap.killTweensOf([
        mainContainer, image, orbitWrapper, tiltWrapper, ...snippets
      ]);
    };
  }, []); // Run once on component mount

  return (
    <>
      {/* --- NEW: HERO SECTION --- */}
      {/* UPDATED: Added relative and z-10 for parallax */}
      <div className="relative z-10 w-full min-h-screen flex items-center pt-32 pb-20 text-dark-text">
        
        {/* Particle Background */}
        <Suspense fallback={<div className="absolute inset-0 bg-dark-bg z-0" />}>
          <ParticlesBackground />
        </Suspense>

        {/* This container holds the content and sits *above* the particles */}
        <div className="container mx-auto px-5 z-10 relative">
          <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center">
            
            {/* --- Left Side (Text & Socials) --- */}
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-semibold text-white">Hey, I&apos;m
                <span className="text-gradient-neon"> Ishaan Katara</span>
              </h1>
              
              <h2 className="text-2xl md:text-3xl font-semibold mt-4 mb-8 h-10 md:h-auto typewriter-gradient font-roboto-mono">
                <span className="text-dark-text mr-2">{prefix}</span>
                <span> 
                  <Typewriter
                    options={{
                      loop: true,
                      autoStart: true,
                    }}
                    onInit={(typewriter) => {
                      typewriter
                        .callFunction(() => { setPrefix("I am a"); })
                        .typeString('Machine Learning Engineer')
                        .pauseFor(1500)
                        .deleteAll()
                        
                        .callFunction(() => { setPrefix("I am a"); })
                        .typeString('Data Scientist')
                        .pauseFor(1500)
                        .deleteAll()

                        .callFunction(() => { setPrefix("I am a"); })
                        .typeString('Computer Scientist')
                        .pauseFor(1500)
                        .deleteAll()

                        .callFunction(() => { setPrefix("I am a"); })
                        .typeString('Software Developer')
                        .pauseFor(1500)
                        .deleteAll()

                        .callFunction(() => { setPrefix("I am an"); })
                        .typeString('Agentic AI Developer')
                        .pauseFor(1500)
                        .deleteAll()
                        
                        .callFunction(() => { setPrefix("I am a"); })
                        .typeString('DevSecOps Engineer')
                        .pauseFor(1500)
                        .deleteAll()

                        .callFunction(() => { setPrefix("I am the"); })
                        .typeString('Founder of SevenIsK')
                        .pauseFor(1500)
                        .deleteAll()
                        
                        .start();
                    }}
                  />
                </span>
              </h2>
              
              {/* --- NEW: Social Icons --- */}
              <div className="flex flex-row gap-6 mt-8">
                {socialLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-dark-text text-3xl transition-all duration-300 hover:text-brand-teal hover:scale-110"
                    aria-label={link.name}
                  >
                    <link.icon />
                  </Link>
                ))}
              </div>
            </div>

            {/* --- Right Side (Wizard Effect) --- */}
            <div className="shrink-0 w-full max-w-sm md:w-1/3 md:max-w-none">
              <div style={{ perspective: '1000px' }}>
                <div
                  ref={mainContainerRef}
                  style={{ opacity: 0, transformStyle: 'preserve-3d' }}
                  className="relative rounded-lg w-full max-w-[270px] md:max-w-full mx-auto"
                >
                  <div
                    ref={imageElRef}
                    className="rounded-lg shadow-2xl"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <Image
                      src="/images/founder2.png"
                      alt="Ishaan Katara, Founder"
                      width={400}
                      height={400}
                      className="rounded-lg w-full h-auto"
                    />
                  </div>
                  <div
                    ref={snippetWrapperRef}
                    className="absolute inset-0"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div
                      ref={snippetTiltWrapperRef}
                      className="absolute inset-0"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {codeSnippets.map((snippet, i) => (
                        <span key={`${snippet.text}-${i}`} className="code-snippet">
                          {snippet.text}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-center mt-4 text-dark-text">Ishaan Katara, Founder & Developer</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- UPDATED: ABOUT ME SECTION --- */}
      {/* UPDATED: Added relative and z-10 for parallax */}
      <div className="relative z-10 py-20 text-dark-text bg-dark-bg">
        <div className="container mx-auto px-5">
          {/* UPDATED: Changed from max-w-4xl to two-column layout */}
          <div className="flex flex-col md:flex-row gap-12 md:gap-16">
            
            {/* --- Left Column (Tabs & CV) --- */}
            <div className="md:w-1/3">
              <h2 className="text-3xl md:text-4xl font-semibold text-white text-left mb-8">
                About <span className="text-gradient-neon">Me</span>
              </h2>
              
              {/* The Tabs and CV Button */}
              <div className="flex flex-row mt-8 mb-4">
                <TabButton selectTab={() => setTab('skills')} active={tab === 'skills'}>
                  Skills
                </TabButton>
                <TabButton selectTab={() => setTab('expereince')} active={tab === 'expereince'}>
                  Experience
                </TabButton>
                <TabButton selectTab={() => setTab('education')} active={tab === 'education'}>
                  Education
                </TabButton>
              </div>
              <div className="mt-4 min-h-[180px]">
                {tab === 'skills' && (
                  <ul className="list-disc pl-5 space-y-2">
                    <li><span>AI\ML</span><br />Developing and Training ML models.</li>
                    <li><span>Agentic AI Development</span><br />Developing and Designing Agentic AI.</li>
                    <li><span>Back-End Development</span><br />Creating server side back-end using Python and Node.js.</li>
                    <li><span>DevOps</span><br />Creating and delivering quality softwares through automation.</li>
                  </ul>
                )}
                {tab === 'expereince' && (
                  <ul className="list-disc pl-5 space-y-2">
                    <li><span>Jan 2025 - March 2025 </span><br />SDE Intern at Digital India Corporation.</li>
                    <li><span>Oct 2024 - Dec 2024</span><br />SDE Intern at STQC (Ministry of Electronics and Information Technology).</li>
                    <li><span>May 2024 - July 2024</span><br />SDE Intern at Sustainivo.</li>
                    <li><span>Nov 2022 - Current</span><br />Founder of Merch Pirates a merchandise retail organization.</li>
                  </ul>
                )}
                {tab === 'education' && (
                  <ul className="list-disc pl-5 space-y-2">
                    <li><span>2023 - 2025</span><br />B. Tech in CSE from JIIT, Noida-62</li>
                    <li><span>2021 - 2022</span><br />B. Tech in CSE from DIT, Dehradun</li>
                    <li><span>2020 - 2021</span><br />CBSE Class 12th from Modern Public School, Delhi.</li>
                  </ul>
                )}
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn inline-block bg-brand-teal-hover text-black py-3 px-8 rounded-md font-semibold mt-6 transition-all duration-300 hover:bg-brand-teal"
              >
                Download CV
              </button>
            </div>

            {/* --- Right Column (Paragraph) --- */}
            <div className="md:w-2/3 md:pt-20">
              {/* The Paragraph with highlights */}
              <p className="text-lg text-justify leading-relaxed">
                Ishaan Katara, the founder of <strong className="text-white">SevenIsK</strong>, is a <span className="text-brand-teal font-medium">Computer Science Engineer</span> and technology innovator passionate about building intelligent and secure software systems. With hands-on experience across <span className="text-brand-teal font-medium">AI Engineering</span>, <span className="text-brand-teal font-medium">Software Development</span>, and <span className="text-brand-teal font-medium">DevSecOps</span>, Ishaan has led projects that bridge automation, machine learning, and scalable backend architectures. He has previously contributed to organizations like the <strong className="text-white">Ministry of Electronics and Information Technology</strong> and <strong className="text-white">Sustainivo</strong>, developing end-to-end MLOps pipelines, secure microservices, and AI-driven solutions. Through SevenIsK, Ishaan aims to drive innovation by creating advanced, human-centric technologies that combine <span className="text-brand-teal font-medium">intelligence, efficiency, and reliability</span>.
              </p>
            </div>

          </div>
        </div>
      </div>
      
      <CVModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default AboutFounderPage;