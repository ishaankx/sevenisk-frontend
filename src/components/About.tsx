// src/components/About.tsx

'use client';

import React, { useState, useEffect, useRef, Suspense, lazy, useCallback } from 'react';
import Image from 'next/image';
import CVModal from './CVModal';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { IconType } from 'react-icons';
import {
  SiNextdotjs, SiReact, SiTypescript, SiNodedotjs, SiPython, SiDocker,
  SiJavascript, SiC, SiCplusplus, SiRust, SiSqlite, SiPytorch, SiLangchain,
  SiNestjs, SiTauri, SiFastapi, SiFlask, SiAmazon, SiKubernetes,
  SiJenkins, SiGitlab, SiGithubactions, SiAnsible, SiSonarqube, SiTerraform,
  SiMongodb, SiPostgresql, SiGit
} from 'react-icons/si';
import { TbBrain } from 'react-icons/tb';

gsap.registerPlugin(ScrollTrigger);

// Lazily import the 3D Model component
const SpaceStationModel = lazy(() => import('./SpaceStationModel'));

type Tab = 'skills' | 'expereince' | 'education';

// --- Type Definitions (DragEvent, TechInfo removed as they are no longer needed here) ---
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

const codeSnippets = [
  { text: '<Component />', x: 0, y: -100, z: 130 },
  { text: "const dev = 'Ishaan';", x: 0, y: 0, z: -140 },
  { text: 'gsap.to(...)', x: 130, y: 40, z: 0 },
  { text: 'useEffect()', x: -130, y: 80, z: 0 },
  { text: 'await prisma.find()', x: 80, y: 120, z: 90 },
  { text: "type Wizard = 'true';", x: -90, y: -60, z: -100 },
];

// NOTE: technologies list is moved to Services.tsx


const ModelPlaceholder: React.FC = () => {
  return (
    <div className="w-full h-[450px] flex items-center justify-center relative bg-black/20 rounded-lg">
      <Image
        src="/images/Desig.jpg"
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
  const [tab, setTab] = useState<Tab>('skills');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Refs for animated sections
  const aboutUsSectionRef = useRef<HTMLDivElement | null>(null);
  const aboutUsTextRef = useRef<HTMLDivElement | null>(null);
  // techScroller refs removed
  const modelCanvasRef = useRef<HTMLDivElement | null>(null);

  // Refs for About Founder (Wizard Effect)
  const mainContainerRef = useRef<HTMLDivElement | null>(null);
  const imageElRef = useRef<HTMLDivElement | null>(null);
  const snippetWrapperRef = useRef<HTMLDivElement | null>(null);
  const snippetTiltWrapperRef = useRef<HTMLDivElement | null>(null);

  // scrollerAnim ref removed
  
  // DRAG LOGIC REFS removed
  
  // Helper function to get clientX and drag handlers removed

  // Effect hook
  useEffect(() => {
    
    let snippets: HTMLElement[] = []; 

    // === 1. ABOUT US ANIMATION (Unchanged logic) ===
    const aboutUsSection = aboutUsSectionRef.current;
    const aboutUsText = aboutUsTextRef.current;
    const modelCanvas = modelCanvasRef.current;

    if (aboutUsSection && aboutUsText && modelCanvas) {
      const aboutUsElements = [
        aboutUsText.querySelector('.sub-title'),
        ...gsap.utils.toArray(aboutUsText.querySelectorAll('p'))
      ];

      gsap.set(modelCanvas, { opacity: 0, scale: 0.8, x: -50 });
      gsap.set(aboutUsElements, { opacity: 0, y: 40 });

      const tlAboutUs = gsap.timeline({
        scrollTrigger: {
          trigger: aboutUsSection,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      });

      tlAboutUs.to(modelCanvas, {
        opacity: 1, scale: 1, x: 0, duration: 1.2, ease: 'power3.out'
      });

      tlAboutUs.to(aboutUsElements, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.2
      }, "-=0.8");
    }

    // === 1.5 - Tech Scroller Logic REMOVED ===

    // === 2. ABOUT FOUNDER ANIMATION (Unchanged logic) ===
    const mainContainer = mainContainerRef.current;
    const image = imageElRef.current;
    const orbitWrapper = snippetWrapperRef.current;
    const tiltWrapper = snippetTiltWrapperRef.current;

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
      gsap.set(mainContainer, { opacity: 0, y: 100, scale: 0.9, rotateX: -30 });
      gsap.set(snippets, { opacity: 0 });

      const tlFounder = gsap.timeline({
        scrollTrigger: {
          trigger: mainContainer,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
      
      tlFounder.to(mainContainer, {
        opacity: 1, y: 0, scale: 1, rotateX: 0,
        duration: 1.2, ease: 'power3.out',
      }, 0);
      tlFounder.to(image, {
        y: -15, duration: 2.5, ease: 'power1.inOut',
        yoyo: true, repeat: -1,
      }, 0.5);
      tlFounder.to(orbitWrapper, {
        rotateY: 360, duration: 20,
        ease: 'none', repeat: -1,
      }, 0.5);
      snippets.forEach((snippet) => {
        const s = codeSnippets[snippets.indexOf(snippet)];
        gsap.set(snippet, { x: s.x, y: s.y, z: s.z });
        tlFounder.to(snippet, {
          opacity: 0.9, duration: 1, ease: 'power2.out',
        }, 0.8);
        gsap.to(snippet, {
          x: `+=${gsap.utils.random(-20, 20)}`,
          y: `+=${gsap.utils.random(-20, 20)}`,
          z: `+=${gsap.utils.random(-25, 25)}`,
          rotateX: `+=${gsap.utils.random(-45, 45)}`,
          rotateY: `+=${gsap.utils.random(-45, 45)}`,
          duration: gsap.utils.random(3, 5),
          yoyo: true, repeat: -1,
          ease: 'sine.inOut',
          delay: gsap.utils.random(0, 2)
        });
      });

      tlFounder.call(() => {
        mainContainer.addEventListener('mousemove', handleFounderMouseMove);
        mainContainer.addEventListener('mouseleave', handleFounderMouseLeave);
      });
    }

    // === 3. MAIN CLEANUP FUNCTION (Simplified) ===
    return () => {
      // Founder cleanup
      if (mainContainer) {
        mainContainer.removeEventListener('mousemove', handleFounderMouseMove);
        mainContainer.removeEventListener('mouseleave', handleFounderMouseLeave);
      }
      
      // Removed Scroller cleanup and Drag cleanup

      gsap.killTweensOf([
        mainContainer, image, orbitWrapper, tiltWrapper, ...snippets,
        aboutUsSection, modelCanvas,
        // Removed scroller refs
        ...gsap.utils.toArray(aboutUsText?.querySelectorAll('p, .sub-title') || [])
      ]);
    };

  }, []); // Dependency array is now empty

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
              <h1 className="sub-title">About Us</h1>
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

          {/* 3. Tech Scroller Section REMOVED */}


          {/* ----- ABOUT FOUNDER Section (Unchanged JSX) ----- */}
          <div className="flex flex-col-reverse md:flex-row gap-12 md:gap-16 items-start">

            {/* Founder Text & Tabs (Unchanged) */}
            <div className="flex-1">
              <h1 className="sub-title">About The Founder</h1>
              <p className="text-lg text-justify mb-6">
                Hi, I&apos;m Ishaan Katara the founder and developer of SevenIsk. I&apos;m a B.tech CSE graduate from JIIT. I started my journey as a student who is interested in coding but now it is my passion and I want to innovate and develop the solution for the problems humans face through technology.
              </p>
              {/* React Tabs (Unchanged) */}
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
                {/* ... (Your unchanged tab content) ... */}
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
                className="btn inline-block bg-brand-teal-hover text-black py-3 px-8 rounded-md font-semibold mt-6 transition-all duration-30all duration-300 hover:bg-brand-teal"
              >
                Download CV
              </button>
            </div>

            {/* Founder Image (Wizard Effect - Unchanged JSX) */}
            <div className="shrink-0 md:w-1/3">
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
                      {codeSnippets.map((snippet) => (
                        <span key={snippet.text} className="code-snippet">
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

      {/* The Modal Component (Unchanged) */}
      <CVModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
 
export default About;