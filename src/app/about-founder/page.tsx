'use client';

// All the imports and logic from the "About Founder" section
import React, {
  useState,
  useEffect,
  useRef,
  Suspense,
  lazy,
  useCallback,
} from 'react';
import Image from 'next/image';
import CVModal from '@/components/CVModal'; // Adjusted path
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Typewriter from 'typewriter-effect';

// NEW: Import social icons
import {
  FaLinkedin,
  FaGithub,
  FaXTwitter,
  FaEnvelope,
  FaBrain, // For AI/ML
  FaSitemap, // For Agentic AI
  FaServer, // For Back-End
  FaInfinity, // For DevOps
  FaBriefcase, // For Internships
  FaBuilding, // For Founder
  FaGraduationCap, // For University
  FaSchool, // For School
} from 'react-icons/fa6';

import Link from 'next/link';

// 2. ADDED: Tech icon imports
import { IconType } from 'react-icons';
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiPython,
  SiDocker,
  SiJavascript,
  SiC,
  SiCplusplus,
  SiRust,
  SiSqlite,
  SiPytorch,
  SiLangchain,
  SiNestjs,
  SiTauri,
  SiFastapi,
  SiFlask,
  SiAmazon,
  SiKubernetes,
  SiJenkins,
  SiGitlab,
  SiGithubactions,
  SiAnsible,
  SiSonarqube,
  SiTerraform,
  SiMongodb,
  SiPostgresql,
  SiGit,
} from 'react-icons/si';
import { TbBrain } from 'react-icons/tb';

// NEW: Lazily import the 3D Model component
const ParticlesBackground = lazy(
  () => import('@/components/ParticlesBackground')
);

// --- MODIFIED: Code Snippets Logic ---
const singleLineOfCode =
  "const{dev}=sevenisk; await.getProfile('ishaan'); model.predict(input); docker.build(sevenisk); kubectl-apply-f;";
const snippetChunks = singleLineOfCode.split(' '); // Split by space
const numSnippets = snippetChunks.length;

// --- MODIFIED: Only store text. Positions will be set in useEffect ---
const codeSnippets = Array.from({ length: numSnippets }).map((_, i) => {
  return {
    text: snippetChunks[i],
  };
});
// --- End of MODIFIED section ---

// NEW: Social Links Array
const socialLinks = [
  {
    name: 'LinkedIn',
    icon: FaLinkedin,
    href: 'https://www.linkedin.com/in/ishaan7/',
  },
  { name: 'GitHub', icon: FaGithub, href: 'https://github.com/ishaankx' },
  { name: 'Email', icon: FaEnvelope, href: 'mailto:kataraishaan@gmail.com' },
  { name: 'Twitter', icon: FaXTwitter, href: 'https://x.com/ishaankatara' },
];

// 3. ADDED: Technology data interfaces
interface TechInfo {
  name: string;
  icon: IconType;
  color: string;
}

// 4. ADDED: New type for proficiency
interface TechInfoWithProficiency extends TechInfo {
  proficiency: 'Intermediate' | 'Advanced';
}

// 5. MODIFIED: Replaced random assignment with a single, hardcoded array.
const founderTechnologies: TechInfoWithProficiency[] = [
  // Languages
  { name: 'Python', icon: SiPython, color: '#3776AB', proficiency: 'Advanced' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', proficiency: 'Advanced' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', proficiency: 'Advanced' },
  { name: 'C', icon: SiC, color: '#A8B9CC', proficiency: 'Intermediate' },
  { name: 'C++', icon: SiCplusplus, color: '#00599C', proficiency: 'Advanced' },
  { name: 'Rust', icon: SiRust, color: '#DE3423', proficiency: 'Intermediate' },
  { name: 'SQL', icon: SiSqlite, color: '#003B57', proficiency: 'Advanced' },
  // Frameworks
  { name: 'PyTorch', icon: SiPytorch, color: '#EE4C2C', proficiency: 'Advanced' },
  { name: 'LangChain', icon: SiLangchain, color: '#8A48FF', proficiency: 'Intermediate' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933', proficiency: 'Advanced' },
  { name: 'NestJS', icon: SiNestjs, color: '#E0234E', proficiency: 'Advanced' },
  { name: 'React.js', icon: SiReact, color: '#61DAFB', proficiency: 'Advanced' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF', proficiency: 'Advanced' },
  { name: 'Tauri', icon: SiTauri, color: '#FFC131', proficiency: 'Intermediate' },
  { name: 'FastAPI', icon: SiFastapi, color: '#009688', proficiency: 'Advanced' },
  { name: 'Flask', icon: SiFlask, color: '#FFFFFF', proficiency: 'Advanced' },
  { name: 'ONNX', icon: TbBrain, color: '#00A99D', proficiency: 'Intermediate' },
  // DevSecOps
  { name: 'AWS', icon: SiAmazon, color: '#FF9900', proficiency: 'Advanced' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED', proficiency: 'Advanced' },
  { name: 'Kubernetes', icon: SiKubernetes, color: '#326CE5', proficiency: 'Intermediate' },
  { name: 'Jenkins', icon: SiJenkins, color: '#D24939', proficiency: 'Intermediate' },
  { name: 'GitLab CI', icon: SiGitlab, color: '#FCA121', proficiency: 'Intermediate' },
  { name: 'GitHub Actions', icon: SiGithubactions, color: '#2088FF', proficiency: 'Advanced' },
  { name: 'Ansible', icon: SiAnsible, color: '#EE0000', proficiency: 'Intermediate' },
  { name: 'SonarQube', icon: SiSonarqube, color: '#4E9BCD', proficiency: 'Intermediate' },
  { name: 'Terraform', icon: SiTerraform, color: '#7B42BC', proficiency: 'Intermediate' },
  // Databases & VC
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248', proficiency: 'Intermediate' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1', proficiency: 'Advanced' },
  { name: 'SQLite', icon: SiSqlite, color: '#003B57', proficiency: 'Intermediate' },
  { name: 'Git', icon: SiGit, color: '#F05032', proficiency: 'Advanced' },
];

type DragEvent = MouseEvent | TouchEvent;
type Tab = 'skills' | 'expereince' | 'education';

// --- Main Page Component ---
const AboutFounderPage: React.FC = () => {
  const [tab, setTab] = useState<Tab>('skills');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [prefix, setPrefix] = useState('I am a');
  
  // --- ⭐️ NEW: State to prevent animation spamming ⭐️ ---
  const [isAnimating, setIsAnimating] = useState(false);

  // Refs for About Founder (Wizard Effect)
  const mainContainerRef = useRef<HTMLDivElement | null>(null);
  const imageElRef = useRef<HTMLDivElement | null>(null);
  const snippetWrapperRef = useRef<HTMLDivElement | null>(null);
  const snippetTiltWrapperRef = useRef<HTMLDivElement | null>(null);

  // --- Refs for Hero Section Parallax ---
  const heroSectionRef = useRef<HTMLDivElement | null>(null);
  const heroLeftColRef = useRef<HTMLDivElement | null>(null);
  const heroRightColRef = useRef<HTMLDivElement | null>(null);

  // --- Refs for About Me Parallax ---
  const aboutMeSectionRef = useRef<HTMLDivElement | null>(null);
  const aboutMeLeftColRef = useRef<HTMLDivElement | null>(null);
  const aboutMeRightColRef = useRef<HTMLDivElement | null>(null);

  // --- Refs for Tech Scroller ---
  const techScrollerRef = useRef<HTMLDivElement | null>(null);
  const techScrollerInnerRef = useRef<HTMLDivElement | null>(null);
  const scrollerAnim = useRef<gsap.core.Timeline | null>(null);
  const isDragging = useRef(false);
  const startMouseX = useRef(0);
  const startTime = useRef(0);
  const scrollWidthRef = useRef(0);

  // --- ⭐️ Refs for Tab Animation ⭐️ ---
  const tabsContainerRef = useRef<HTMLDivElement | null>(null);
  const skillsTabRef = useRef<HTMLButtonElement | null>(null);
  const expTabRef = useRef<HTMLButtonElement | null>(null);
  const eduTabRef = useRef<HTMLButtonElement | null>(null);
  const underlineRef = useRef<HTMLDivElement | null>(null);

  const skillsContentRef = useRef<HTMLUListElement | null>(null);
  const expContentRef = useRef<HTMLUListElement | null>(null);
  const eduContentRef = useRef<HTMLUListElement | null>(null);
  // --- End of new refs ---

  // --- Scroller drag-and-drop logic ---
  const getClientX = (e: DragEvent): number => {
    if (e instanceof TouchEvent && e.touches.length > 0) {
      return e.touches[0].clientX;
    }
    return (e as MouseEvent).clientX;
  };

  const handleMouseMove = useCallback((e: DragEvent) => {
    if (
      !isDragging.current ||
      !scrollerAnim.current ||
      !techScrollerInnerRef.current
    )
      return;

    const clientX = getClientX(e);
    const deltaX = clientX - startMouseX.current;
    const duration = scrollerAnim.current.duration();
    const loopDistance = scrollWidthRef.current;
    const ratio = duration / loopDistance;
    let newTime = startTime.current - deltaX * ratio;
    newTime = gsap.utils.wrap(0, duration, newTime);
    scrollerAnim.current.time(newTime);
  }, []);

  const handleMouseUp = useCallback(() => {
    if (!isDragging.current || !scrollerAnim.current) return;
    isDragging.current = false;

    document.removeEventListener('mousemove', handleMouseMove as EventListener);
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('touchmove', handleMouseMove as EventListener);
    document.removeEventListener('touchend', handleMouseUp);
    document.removeEventListener('mouseleave', handleMouseUp);

    gsap.to(scrollerAnim.current, {
      timeScale: 1,
      duration: 0.5,
      ease: 'power1.out',
      onComplete: () => {
        if (scrollerAnim.current) scrollerAnim.current.play();
      },
    });
  }, [handleMouseMove]);

  const handleMouseDown = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!techScrollerRef.current || !scrollerAnim.current) return;
      if (e instanceof MouseEvent && e.button !== 0) return;

      isDragging.current = true;
      startMouseX.current = getClientX(e as DragEvent);
      startTime.current = scrollerAnim.current.time();
      scrollerAnim.current.pause();

      document.addEventListener('mousemove', handleMouseMove as EventListener);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleMouseMove as EventListener);
      document.addEventListener('touchend', handleMouseUp);
      document.addEventListener('mouseleave', handleMouseUp);
    },
    [handleMouseMove, handleMouseUp]
  );
  
  // --- ⭐️ MODIFIED: Tab Animation Logic ⭐️ ---
  const animateUnderline = (target: HTMLElement) => {
    if (!underlineRef.current || !tabsContainerRef.current) return;

    const containerRect = tabsContainerRef.current.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    
    const newLeft = targetRect.left - containerRect.left;
    const newWidth = targetRect.width;

    gsap.to(underlineRef.current, {
      left: newLeft,
      width: newWidth,
      duration: 0.3,
      ease: 'power3.out',
    });
  };

  // This is now the *only* function that handles tab changes
  const handleTabChange = (
    newTab: Tab,
    targetRef: React.RefObject<HTMLElement>
  ) => {
    // Prevent animation spam
    if (newTab === tab || !targetRef.current || isAnimating) return;
    setIsAnimating(true);

    // 1. Get refs for current and new content
    let currentContentRef: React.RefObject<HTMLUListElement> | null = null;
    if (tab === 'skills') currentContentRef = skillsContentRef;
    if (tab === 'expereince') currentContentRef = expContentRef;
    if (tab === 'education') currentContentRef = eduContentRef;
    
    let newContentRef: React.RefObject<HTMLUListElement> | null = null;
    if (newTab === 'skills') newContentRef = skillsContentRef;
    if (newTab === 'expereince') newContentRef = expContentRef;
    if (newTab === 'education') newContentRef = eduContentRef;

    if (!currentContentRef?.current || !newContentRef?.current) return;

    // 2. Animate underline
    animateUnderline(targetRef.current);
    
    // 3. Get items for animation
    const oldItems = gsap.utils.toArray(currentContentRef.current.children);
    const newItems = gsap.utils.toArray(newContentRef.current.children);

    // 4. Create single, seamless timeline
    const tl = gsap.timeline({
      onComplete: () => {
        setTab(newTab); // Set React state *after* animation is done
        setIsAnimating(false);
      },
    });

    // 5. Run the animations
    tl.to(oldItems, {
        opacity: 0,
        x: -20,
        duration: 0.2,
        stagger: 0.05,
        ease: 'power1.in',
      })
      .set(currentContentRef.current, { display: 'none' }) // Hide old list
      .set(newContentRef.current, { display: 'block' })  // Show new list
      .set(newItems, { opacity: 0, y: 20, x: 0 })      // Set initial state of new list
      .to(newItems, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.07,
        ease: 'power3.out',
      });
  };

  // --- REMOVED: useEffect([tab]) ---
  // The logic from that hook is now inside handleTabChange

  useEffect(() => {
    // --- Set initial underline position ---
    if (skillsTabRef.current) {
      animateUnderline(skillsTabRef.current);
    }
    
    // --- ⭐️ NEW: Set initial visibility of tab content ⭐️ ---
    gsap.set([expContentRef.current, eduContentRef.current], { display: 'none' });
    gsap.set(skillsContentRef.current, { display: 'block' });
    // Set initial items to full opacity without animation
    if(skillsContentRef.current) {
      gsap.set(skillsContentRef.current.children, { opacity: 1, y: 0 });
    }
    // --- End of new logic ---


    let snippets: HTMLElement[] = [];
    const mainContainer = mainContainerRef.current;
    const image = imageElRef.current;
    const snippetWrapper = snippetWrapperRef.current;
    const tiltWrapper = snippetTiltWrapperRef.current;

    const handleFounderMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      if (!tiltWrapper) return;
      const { offsetWidth, offsetHeight, offsetLeft, offsetTop } =
        tiltWrapper;
      
      const xPos = clientX - (offsetLeft + offsetWidth / 2);
      const yPos = clientY - (offsetTop + offsetHeight / 2);
      const rotateY = gsap.utils.mapRange(
        -offsetWidth / 2,
        offsetWidth / 2,
        -10,
        10,
        xPos
      );
      const rotateX = gsap.utils.mapRange(
        -offsetHeight / 2,
        offsetHeight / 2,
        10,
        -10,
        yPos
      );

      gsap.to(image, {
        rotateX: rotateX * 0.5,
        rotateY: rotateY * 0.5,
        duration: 0.7,
        ease: 'power1.out',
      });
      gsap.to(tiltWrapper, {
        rotateX: rotateX * 1.2,
        rotateY: rotateY * 1.2,
        duration: 0.7,
        ease: 'power1.out',
      });
    };

    const handleFounderMouseLeave = () => {
      gsap.to(image, {
        rotateX: 0,
        rotateY: 0,
        duration: 1,
        ease: 'power1.out',
      });
      gsap.to(tiltWrapper, {
        rotateX: 0,
        rotateY: 0,
        duration: 1,
        ease: 'power1.out',
      });
    };

    if (mainContainer && image && snippetWrapper && tiltWrapper) {
      snippets = gsap.utils.toArray<HTMLElement>('.code-snippet');
      
      const isMobile = window.innerWidth < 768;
      const floatRangeX = isMobile ? [-80, 80] : [-200, 200];
      const floatRangeY = isMobile ? [-120, 120] : [-150, 150];

      gsap.set(mainContainer, {
        opacity: 0,
        y: 50,
        scale: 0.9,
        rotateX: -10,
      });
      gsap.set(snippets, { opacity: 0 });

      const tlFounder = gsap.timeline({ delay: 0.2 });

      tlFounder.to(
        mainContainer,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 1.2,
          ease: 'power3.out',
        },
        0
      );
      tlFounder.to(
        image,
        {
          y: -15,
          duration: 2.5,
          ease: 'power1.inOut',
          yoyo: true,
          repeat: -1,
        },
        0.5
      );

      snippets.forEach((snippet, i) => {
        
        const xPos = gsap.utils.random(floatRangeX[0], floatRangeX[1]);
        const yPos = gsap.utils.random(floatRangeY[0], floatRangeY[1]);
    
        gsap.set(snippet, {
          x: xPos,
          y: yPos,
          z: -50, 
        });

        tlFounder.to(
          snippet,
          {
            opacity: 0.9, 
            duration: 1,
            ease: 'power2.out',
          },
          0.8
        );

        gsap.to(snippet, {
          x: `+=${gsap.utils.random(-20, 15)}`, 
          y: `+=${gsap.utils.random(-35, 30)}`, 
          duration: gsap.utils.random(7, 10), 
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: gsap.utils.random(0, 5), 
        });
      });

      tlFounder.call(() => {
        tiltWrapper.addEventListener('mousemove', handleFounderMouseMove);
        tiltWrapper.addEventListener('mouseleave', handleFounderMouseLeave);
      });
    }

    const heroSection = heroSectionRef.current;
    const heroLeft = heroLeftColRef.current;
    const heroRight = heroRightColRef.current;

    if (heroSection && heroLeft && heroRight) {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: heroSection,
            start: 'top top', 
            end: 'bottom top', 
            scrub: 1,
          },
        })
        .to(
          [heroLeft, heroRight],
          {
            opacity: 0,
            scale: 0.8,
            y: -100, 
            ease: 'none',
          },
          0
        );
    }

    const aboutSection = aboutMeSectionRef.current;
    const leftCol = aboutMeLeftColRef.current;
    const rightCol = aboutMeRightColRef.current;

    if (aboutSection && leftCol && rightCol) {
      gsap.set(leftCol, { y: 50, opacity: 0, scale: 0.9 });
      gsap.set(rightCol, { y: 50, opacity: 0, scale: 0.9 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: aboutSection,
            start: 'top 90%', 
            end: 'top 40%', 
            scrub: 1, 
          },
        })
        .to(
          leftCol,
          {
            y: -50, 
            opacity: 1,
            scale: 1,
            ease: 'none',
          },
          0
        )
        .to(
          rightCol,
          {
            y: -20, 
            opacity: 1,
            scale: 1,
            ease: 'none',
          },
          0
        );
    }

    const scroller = techScrollerRef.current;
    const scrollerInner = techScrollerInnerRef.current;
    let techCards: HTMLElement[] = []; 

    const onCardMouseEnter = () => {
      if (scrollerAnim.current) {
        gsap.to(scrollerAnim.current, { timeScale: 0, duration: 0.3 });
      }
    };
    const onCardMouseLeave = () => {
      if (scrollerAnim.current && !isDragging.current) {
        gsap.to(scrollerAnim.current, { timeScale: 1, duration: 0.3 });
      }
    };

    if (scroller && scrollerInner) {
      techCards = gsap.utils.toArray<HTMLElement>(
        scrollerInner.children
      );

      let scrollWidth = 0;
      const numCards = founderTechnologies.length;
      for (let i = 0; i < numCards; i++) {
        if (techCards[i]) {
          scrollWidth += techCards[i].offsetWidth + 32;
        }
      }
      scrollWidthRef.current = scrollWidth;

      scrollerAnim.current = gsap.timeline({
        repeat: -1,
        ease: 'none',
      });
      scrollerAnim.current.to(scrollerInner, {
        x: -scrollWidth,
        duration: 80, 
      });

      scroller.addEventListener('mousedown', handleMouseDown as EventListener);
      scroller.addEventListener('touchstart', handleMouseDown as EventListener);

      techCards.forEach((card) => {
        card.addEventListener('mouseenter', onCardMouseEnter);
        card.addEventListener('mouseleave', onCardMouseLeave);
      });
    }

    // --- Cleanup Function ---
    return () => {
      if (tiltWrapper) {
        tiltWrapper.removeEventListener('mousemove', handleFounderMouseMove);
        tiltWrapper.removeEventListener('mouseleave', handleFounderMouseLeave);
      }

      if (scroller) {
        scroller.removeEventListener(
          'mousedown',
          handleMouseDown as EventListener
        );
        scroller.removeEventListener(
          'touchstart',
          handleMouseDown as EventListener
        );
      }
      techCards.forEach((card) => {
        card.removeEventListener('mouseenter', onCardMouseEnter);
        card.removeEventListener('mouseleave', onCardMouseLeave);
      });

      document.removeEventListener(
        'mousemove',
        handleMouseMove as EventListener
      );
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener(
        'touchmove',
        handleMouseMove as EventListener
      );
      document.removeEventListener('touchend', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseUp);

      gsap.killTweensOf([
        mainContainer,
        image,
        snippetWrapper, 
        tiltWrapper,
        ...snippets,
        heroSection,
        heroLeft,
        heroRight,
        aboutSection,
        leftCol,
        rightCol,
        scroller,
        scrollerInner,
        underlineRef.current,
        // --- ⭐️ NEW: Kill list item tweens ---
        skillsContentRef.current ? gsap.utils.toArray(skillsContentRef.current.children) : [],
        expContentRef.current ? gsap.utils.toArray(expContentRef.current.children) : [],
        eduContentRef.current ? gsap.utils.toArray(eduContentRef.current.children) : [],
      ]);
    };
  }, [handleMouseDown, handleMouseMove, handleMouseUp]); // Dependencies are correct

  return (
    <>
      {/* --- NEW: HERO SECTION --- */}
      <div
        ref={heroSectionRef} 
        className="relative z-10 w-full min-h-screen flex items-center pt-32 pb-20 text-dark-text overflow-x-hidden"
      >
        {/* Particle Background */}
        <Suspense
          fallback={<div className="absolute inset-0 bg-dark-bg z-0" />}
        >
          <ParticlesBackground />
        </Suspense>

        {/* This container holds the content and sits *above* the particles */}
        <div className="container mx-auto px-5 z-10 relative">
          <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center">
            {/* --- Left Side (Text & Socials) --- */}
            <div ref={heroLeftColRef} className="flex-1">
              
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-semibold text-white">
                Hey, I&apos;m
                <span className="text-gradient-neon"> Ishaan Katara</span>
              </h1>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mt-4 mb-8 typewriter-gradient font-roboto-mono">
                <span className="text-dark-text mr-2">{prefix}</span>
                <span>
                  <Typewriter
                    options={{
                      loop: true,
                      autoStart: true,
                    }}
                    onInit={(typewriter) => {
                      typewriter

                        .callFunction(() => {
                          setPrefix('I am a');
                        })
                        .typeString('Software Developer')
                        .pauseFor(1500)
                        .deleteAll()
                        .callFunction(() => {
                          setPrefix('I am a');
                        })

                        .callFunction(() => {
                          setPrefix('I am the');
                        })
                        .typeString('Founder of SevenIsK')
                        .pauseFor(1500)
                        .deleteAll()

                        .callFunction(() => {
                          setPrefix('I am a');
                        })
                        .typeString('Computer Scientist')
                        .pauseFor(1500)
                        .deleteAll()
                        
                        .typeString('Machine Learning Engineer')
                        .pauseFor(1500)
                        .deleteAll()
                        .callFunction(() => {
                          setPrefix('I am an');
                        })
                        .typeString('Agentic AI Developer')
                        .pauseFor(1500)
                        .deleteAll()
                        .callFunction(() => {
                          setPrefix('I am a');
                        })
                        .typeString('DevSecOps Engineer')
                        .pauseFor(1500)
                        .deleteAll()
                        .callFunction(() => {
                          setPrefix('I am a');
                        })
                        .typeString('Data Scientist')
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
            <div
              ref={heroRightColRef}
              className="shrink-0 w-full max-w-sm md:w-1/3 md:max-w-none"
            >
              <div style={{ perspective: '1000px' }}>
                <div
                  ref={snippetTiltWrapperRef}
                  className="relative w-full"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  
                  {/* 1. SNIPPETS (BACKGROUND) */}
                  <div
                    ref={snippetWrapperRef}
                    className="absolute inset-0 flex justify-center items-center"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {codeSnippets.map((snippet, i) => (
                      <span
                        key={`${snippet.text}-${i}`}
                        className="code-snippet"
                      >
                        {snippet.text}
                      </span>
                    ))}
                  </div>

                  {/* 2. IMAGE (FOREGROUND) */}
                  <div
                    ref={mainContainerRef}
                    style={{ opacity: 0, transformStyle: 'preserve-3d' }}
                    className="relative z-10 w-full max-w-[270px] md:max-w-full mx-auto"
                  >
                    <div
                      ref={imageElRef}
                      className="rounded-lg shadow-2xl relative z-10"
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
                  </div>

                </div>
              </div>
              <p className="text-center mt-4 text-dark-text">
                Ishaan Katara, Founder & Developer
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- UPDATED: ABOUT ME SECTION --- */}
      <div
        ref={aboutMeSectionRef}
        className="relative z-10 py-20 text-dark-text bg-dark-bg"
      >
        <div className="container mx-auto px-5">
          <div className="flex flex-col md:flex-row gap-12 md:gap-16">
            {/* --- Left Column (Tabs & CV) --- */}
            <div
              ref={aboutMeLeftColRef}
              className="md:w-1/3" // FIXED typo
            >
              <h2 className="text-3xl md:text-4xl font-semibold text-white text-left mb-8">
                About <span className="text-gradient-neon">Me</span>
              </h2>

              {/* --- ⭐️ NEW: Tab Button Implementation ⭐️ --- */}
              <div
                ref={tabsContainerRef}
                className="relative flex flex-row mt-8 mb-4"
              >
                <button
                  ref={skillsTabRef}
                  onClick={() => handleTabChange('skills', skillsTabRef)}
                  className="mr-6 py-1"
                >
                  <p
                    className={`font-semibold transition-all ${
                      tab === 'skills' ? 'text-white' : 'text-dark-text'
                    }`}
                  >
                    <span className="text-gradient-neon">Skills</span>
                  </p>
                </button>
                <button
                  ref={expTabRef}
                  onClick={() =>
                    handleTabChange('expereince', expTabRef)
                  }
                  className="mr-6 py-1"
                >
                  <p
                    className={`font-semibold transition-all ${
                      tab === 'expereince' ? 'text-white' : 'text-dark-text'
                    }`}
                  >
                    <span className="text-gradient-neon">Experience</span>
                  </p>
                </button>
                <button
                  ref={eduTabRef}
                  onClick={() => handleTabChange('education', eduTabRef)}
                  className="mr-6 py-1"
                >
                  <p
                    className={`font-semibold transition-all ${
                      tab === 'education' ? 'text-white' : 'text-dark-text'
                    }`}
                  >
                    <span className="text-gradient-neon">Education</span>
                  </p>
                </button>
                {/* The Sliding Underline */}
                <div
                  ref={underlineRef}
                  className="absolute bottom-0 left-0 h-[3px] bg-brand-teal rounded-full"
                />
              </div>
              {/* --- ⭐️ End of new Tab implementation ⭐️ --- */}

              {/* --- ⭐️ MODIFIED: Content container for animation ⭐️ --- */}
              {/* This parent div holds the height while children animate */}
              <div className="relative mt-4 min-h-[220px]"> 
                <ul
                  ref={skillsContentRef}
                  className="space-y-4" // Removed list-disc and padding
                >
                  <li className="flex flex-row gap-3">
                    <div className="mt-1">
                      <FaBrain className="text-brand-teal text-lg" />
                    </div>
                    <div>
                      <span className="font-semibold text-white">AI\ML</span>
                      <p className="text-sm text-dark-text mt-0.5">
                        Developing and Training ML models.(LLMs/GenAI & CNNs)
                      </p>
                    </div>
                  </li>
                  <li className="flex flex-row gap-3">
                    <div className="mt-1">
                      <FaSitemap className="text-brand-teal text-lg" />
                    </div>
                    <div>
                      <span className="font-semibold text-white">
                        Agentic AI Development
                      </span>
                      <p className="text-sm text-dark-text mt-0.5">
                        Developing and Designing Agentic AI.
                      </p>
                    </div>
                  </li>
                  <li className="flex flex-row gap-3">
                    <div className="mt-1">
                      <FaServer className="text-brand-teal text-lg" />
                    </div>
                    <div>
                      <span className="font-semibold text-white">
                        Back-End Development
                      </span>
                      <p className="text-sm text-dark-text mt-0.5">
                        Creating server side back-end using Python and Node.js.
                      </p>
                    </div>
                  </li>
                  <li className="flex flex-row gap-3">
                    <div className="mt-1">
                      <FaInfinity className="text-brand-teal text-lg" />
                    </div>
                    <div>
                      <span className="font-semibold text-white">DevOps</span>
                      <p className="text-sm text-dark-text mt-0.5">
                        Creating and delivering quality softwares through automation.
                      </p>
                    </div>
                  </li>
                </ul>

                <ul
                  ref={expContentRef}
                  className="space-y-4 hidden" // Start hidden
                >
                  <li className="flex flex-row gap-3">
                    <div className="mt-1">
                      <FaBriefcase className="text-brand-teal text-lg" />
                    </div>
                    <div>
                      <span className="font-semibold text-white">
                        June 2025 - Current
                      </span>
                      <p className="text-sm text-dark-text mt-0.5">
                        SDE Intern at Digital India Corporation.
                      </p>
                    </div>
                  </li>
                  <li className="flex flex-row gap-3">
                    <div className="mt-1">
                      <FaBriefcase className="text-brand-teal text-lg" />
                    </div>
                    <div>
                      <span className="font-semibold text-white">
                        Oct 2024 - Dec 2024
                      </span>
                      <p className="text-sm text-dark-text mt-0.5">
                        SDE Intern at STQC (Ministry of Electronics and Information
                        Technology).
                      </p>
                    </div>
                  </li>
                  <li className="flex flex-row gap-3">
                    <div className="mt-1">
                      <FaBriefcase className="text-brand-teal text-lg" />
                    </div>
                    <div>
                      <span className="font-semibold text-white">
                        May 2024 - July 2024
                      </span>
                      <p className="text-sm text-dark-text mt-0.5">
                        SDE Intern at Sustainivo.
                      </p>
                    </div>
                  </li>
                  <li className="flex flex-row gap-3">
                    <div className="mt-1">
                      <FaBuilding className="text-brand-teal text-lg" />
                    </div>
                    <div>
                      <span className="font-semibold text-white">
                        Nov 2023 - Current
                      </span>
                      <p className="text-sm text-dark-text mt-0.5">
                        Founder of SevenIsK.
                      </p>
                    </div>
                  </li>
                </ul>
                
                <ul
                  ref={eduContentRef}
                  className="space-y-4 hidden" // Start hidden
                >
                  <li className="flex flex-row gap-3">
                    <div className="mt-1">
                      <FaGraduationCap className="text-brand-teal text-lg" />
                    </div>
                    <div>
                      <span className="font-semibold text-white">2023 - 2025</span>
                      <p className="text-sm text-dark-text mt-0.5">
                        B. Tech in CSE from JIIT, Noida-62
                      </p>
                    </div>
                  </li>
                  <li className="flex flex-row gap-3">
                    <div className="mt-1">
                      <FaGraduationCap className="text-brand-teal text-lg" />
                    </div>
                    <div>
                      <span className="font-semibold text-white">2021 - 2022</span>
                      <p className="text-sm text-dark-text mt-0.5">
                        B. Tech in CSE from DIT, Dehradun
                      </p>
                    </div>
                  </li>
                  <li className="flex flex-row gap-3">
                    <div className="mt-1">
                      <FaSchool className="text-brand-teal text-lg" />
                    </div>
                    <div>
                      <span className="font-semibold text-white">2020 - 2021</span>
                      <p className="text-sm text-dark-text mt-0.5">
                        CBSE Class 12th from Modern Public School, Delhi.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              {/* --- ⭐️ End of modified content container ⭐️ --- */}

              <button
                onClick={() => setIsModalOpen(true)}
                className="btn inline-block bg-brand-teal-hover text-black py-3 px-8 rounded-md font-semibold mt-6 transition-all duration-300 hover:bg-brand-teal"
              >
                Download CV
              </button>
            </div>

            {/* --- Right Column (Paragraph) --- */}
            <div
              ref={aboutMeRightColRef} // (Ref was already here, correct)
              className="md:w-2/3 md:pt-20"
            >
              {/* The Paragraph with highlights */}
              <p className="text-lg text-justify leading-relaxed">
                Ishaan Katara, the founder of{' '}
                <strong className="text-white">SevenIsK</strong>, is a{' '}
                <span className="text-brand-teal font-medium">
                  Computer Science Engineer
                </span>{' '}
                and technology innovator passionate about building intelligent
                and secure software systems. With hands-on experience across{' '}
                <span className="text-brand-teal font-medium">
                  AI Engineering
                </span>
                ,{' '}
                <span className="text-brand-teal font-medium">
                  Software Development
                </span>
                , and{' '}
                <span className="text-brand-teal font-medium">DevSecOps</span>,
                Ishaan has led projects that bridge automation, machine
                learning, and scalable backend architectures. He has previously
                contributed to organizations like the{' '}
                <strong className="text-white">
                  Ministry of Electronics and Information Technology
                </strong>{' '}
                and <strong className="text-white">Sustainivo</strong>,
                developing end-to-end MLOps pipelines, secure microservices, and
                AI-driven solutions. Through SevenIsK, Ishaan aims to drive
                innovation by creating advanced, human-centric technologies that
                combine{' '}
                <span className="text-brand-teal font-medium">
                  intelligence, efficiency, and reliability
                </span>
                .
              </p>
            </div>
          </div>

          {/* --- FIXED: Tech Scroller Moved Here --- */}
          <div className="w-full max-w-6xl mx-auto mt-24">
            <div className="flex flex-col items-center mb-8">
              {/* Re-using h2 styles, but with h3 for semantics */}
              <h3 className="text-3xl md:text-4xl font-semibold text-white">
                My <span className="text-gradient-neon">Tech Stack</span>
              </h3>
            </div>
            <div
              ref={techScrollerRef}
              className="founder-tech-scroller"
              // FIXED: Removed onMouseDown and onTouchStart from JSX
              // Event listeners are added in useEffect
            >
              <div
                ref={techScrollerInnerRef}
                className="founder-tech-scroller-inner"
              >
                {[...founderTechnologies, ...founderTechnologies].map(
                  (tech, index) => (
                    <div
                      key={`${tech.name}-${index}`}
                      className="founder-tech-card"
                    >
                      <div className="founder-tech-card-inner">
                        {/* FRONT OF CARD */}
                        <div className="founder-tech-card-front">
                          {/* --- MODIFIED: Responsive Icon --- */}
                          <tech.icon
                            style={{ color: tech.color }}
                            className="text-5xl md:text-6xl"
                          />
                        </div>
                        {/* BACK OF CARD */}
                        <div className="founder-tech-card-back">
                          {/* --- MODIFIED: Responsive Gaps/Text --- */}
                          <div className="flex items-center gap-1 md:gap-2">
                            <tech.icon
                              style={{ color: tech.color }}
                              className="text-base md:text-lg"
                            />
                            <span className="font-semibold text-xs md:text-sm">
                              {tech.name}
                            </span>
                          </div>
                          <p className="text-xs text-brand-teal my-1 md:my-2">
                            {tech.proficiency}
                          </p>
                          {/* --- End of MODIFIED section --- */}
                          <div className="proficiency-bars">
                            <span
                              className={
                                tech.proficiency ===
                                  'Intermediate' ||
                                tech.proficiency === 'Advanced'
                                  ? 'active'
                                  : ''
                              }
                            ></span>
                            <span
                              className={
                                tech.proficiency ===
                                  'Intermediate' ||
                                tech.proficiency === 'Advanced'
                                  ? 'active'
                                  : ''
                              }
                            ></span>
                            <span
                              className={
                                tech.proficiency === 'Advanced'
                                  ? 'active'
                                  : ''
                              }
                            ></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <CVModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default AboutFounderPage;