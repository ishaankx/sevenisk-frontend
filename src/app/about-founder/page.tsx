// src/app/about-founder/page.tsx

'use client';

// All the imports and logic from the "About Founder" section
import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import Image from 'next/image';
import CVModal from '@/components/CVModal'; // Adjusted path
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
// NEW: Import the typewriter component
import Typewriter from 'typewriter-effect';

gsap.registerPlugin(ScrollTrigger);

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

// --- Code Snippets (Copied from About.tsx) ---
const codeSnippets = [
  { text: '<Component />', x: 0, y: -100, z: 130 },
  { text: "const dev = 'Ishaan';", x: 0, y: 0, z: -140 },
  { text: 'gsap.to(...)', x: 130, y: 40, z: 0 },
  { text: 'useEffect()', x: -130, y: 80, z: 0 },
  { text: 'await prisma.find()', x: 80, y: 120, z: 90 },
  { text: "type Wizard = 'true';", x: -90, y: -60, z: -100 },
];

// --- Main Page Component ---
const AboutFounderPage: React.FC = () => {
  const [tab, setTab] = useState<Tab>('skills');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  // NEW: State for the typewriter prefix
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
      <div className="py-20 text-dark-text pt-32"> {/* Added pt-32 for navbar */}
        <div className="container mx-auto px-5">
          {/* ----- ABOUT FOUNDER Section ----- */}
          <div className="flex flex-col-reverse md:flex-row gap-12 md:gap-16 items-start">

            {/* Founder Text & Tabs */}
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-semibold text-white">Hey, I&apos;m
                <span className="text-gradient-neon"> Ishaan Katara</span>
              </h1>
              
              {/* --- UPDATED: Typewriter Section --- */}
              <h2 className="text-2xl md:text-3xl font-medium mt-4 mb-8 h-10 md:h-auto typewriter-gradient">
                {/* 1. Apply 'text-dark-text' here to be overridden by CSS */}
                <span className="text-dark-text mr-2 ">{prefix}</span>
                {/* 2. Remove all classes from this span */}
                <span className="font-roboto-mono font-semibold"> 
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

                        // The special case
                        .callFunction(() => { setPrefix("I am the"); })
                        .typeString('Founder of SevenIsK')
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

                        .start();
                    }}
                  />
                </span>
              </h2>
              {/* --- End Typewriter Section --- */}
              <p className="text-lg text-justify mb-6">
                Ishaan Katara, the founder of <strong>SevenIsK</strong>, is a Computer Science Engineer and technology innovator passionate about building intelligent and secure software systems. With hands-on experience across <strong>AI Engineering</strong>, <strong>Software Development</strong>, and <strong>DevSecOps</strong>, Ishaan has led projects that bridge automation, machine learning, and scalable backend architectures. He has previously contributed to organizations like the <strong>Ministry of Electronics and Information Technology</strong> and <strong>Sustainivo</strong>, developing end-to-end MLOps pipelines, secure microservices, and AI-driven solutions. Through SevenIsK, Ishaan aims to drive innovation by creating advanced, human-centric technologies that combine <strong>intelligence, efficiency, and reliability</strong>.
              </p>

              {/* React Tabs */}
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

            {/* Founder Image (Wizard Effect) */}
            <div className="shrink-0 md:w-1D/3">
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
      <CVModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default AboutFounderPage;