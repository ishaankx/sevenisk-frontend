// src/components/Services.tsx

'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode, faRobot, faMicrochip, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { gsap } from 'gsap';
import { IconType } from 'react-icons';
import {
  SiNextdotjs, SiReact, SiTypescript, SiNodedotjs, SiPython, SiDocker,
  SiJavascript, SiC, SiCplusplus, SiRust, SiSqlite, SiPytorch, SiLangchain,
  SiNestjs, SiTauri, SiFastapi, SiFlask, SiAmazon, SiKubernetes,
  SiJenkins, SiGitlab, SiGithubactions, SiAnsible, SiSonarqube, SiTerraform,
  SiMongodb, SiPostgresql, SiGit
} from 'react-icons/si';
import { TbBrain } from 'react-icons/tb';

interface Service {
  icon: IconDefinition;
  title: string;
  description: string;
}

interface TechInfo {
  name: string;
  icon: IconType;
  color: string;
}

type DragEvent = MouseEvent | TouchEvent;

const servicesData: Service[] = [
  {
    icon: faLaptopCode,
    title: 'Software Development',
    description: 'Quality software solutions production for commercial and professional use cases.',
  },
  {
    icon: faRobot,
    title: 'Automation Using AI',
    description: 'Automation of softwares and tasks using AI and ML models, development of softwares which automate the tasks for better performance.',
  },
  {
    icon: faMicrochip,
    title: 'AI Integrated Development',
    description: 'Integration of AI into the sofwares and websites for advancement of the quality of work.',
  },
];

// Technology list moved from About.tsx
const technologies: TechInfo[] = [
  // Languages
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'C', icon: SiC, color: '#A8B9CC' },
  { name: 'C++', icon: SiCplusplus, color: '#00599C' },
  { name: 'Rust', icon: SiRust, color: '#DE3423' },
  { name: 'SQL', icon: SiSqlite, color: '#003B57' },
  // Frameworks
  { name: 'PyTorch', icon: SiPytorch, color: '#EE4C2C' },
  { name: 'LangChain', icon: SiLangchain, color: '#8A48FF' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'NestJS', icon: SiNestjs, color: '#E0234E' },
  { name: 'React.js', icon: SiReact, color: '#61DAFB' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF' },
  { name: 'Tauri', icon: SiTauri, color: '#FFC131' },
  { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
  { name: 'Flask', icon: SiFlask, color: '#FFFFFF' },
  { name: 'ONNX', icon: TbBrain, color: '#00A99D' },
  // DevSecOps
  { name: 'AWS', icon: SiAmazon, color: '#FF9900' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED' },
  { name: 'Kubernetes', icon: SiKubernetes, color: '#326CE5' },
  { name: 'Jenkins', icon: SiJenkins, color: '#D24939' },
  { name: 'GitLab CI', icon: SiGitlab, color: '#FCA121' },
  { name: 'GitHub Actions', icon: SiGithubactions, color: '#2088FF' },
  { name: 'Ansible', icon: SiAnsible, color: '#EE0000' },
  { name: 'SonarQube', icon: SiSonarqube, color: '#4E9BCD' },
  { name: 'Terraform', icon: SiTerraform, color: '#7B42BC' },
  // Databases & VC
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
  { name: 'SQLite', icon: SiSqlite, color: '#003B57' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
];


const Services: React.FC = () => {
  const techScrollerRef = useRef<HTMLDivElement | null>(null);
  const techScrollerInnerRef = useRef<HTMLDivElement | null>(null);
  const scrollerAnim = useRef<gsap.core.Timeline | null>(null);

  // === DRAG LOGIC REFS (JITTER FIX) ===
  const isDragging = useRef(false);
  const startMouseX = useRef(0); 
  const startTime = useRef(0); 
  const scrollWidthRef = useRef(0); 

  // Helper function to get clientX (UNCHANGED)
  const getClientX = (e: DragEvent): number => {
    if (e instanceof TouchEvent && e.touches.length > 0) {
      return e.touches[0].clientX;
    }
    return (e as MouseEvent).clientX;
  };

  // --- MOUSE UP: Resumes the infinite loop ---
  const handleMouseUp = useCallback(() => {
    if (!isDragging.current || !scrollerAnim.current) return;
    isDragging.current = false;

    // Remove event listeners
    document.removeEventListener('mousemove', handleMouseMove as EventListener);
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('touchmove', handleMouseMove as EventListener);
    document.removeEventListener('touchend', handleMouseUp);
    
    // Resume the infinite loop smoothly
    gsap.to(scrollerAnim.current, { 
        timeScale: 1, 
        duration: 0.5, 
        ease: 'power1.out',
        onComplete: () => {
            if(scrollerAnim.current) scrollerAnim.current.play();
        }
    });

  }, []);

  // --- MOUSE MOVE: Handles the drag calculation (JITTER FIX) ---
  const handleMouseMove = useCallback((e: DragEvent) => {
    if (!isDragging.current || !scrollerAnim.current || !techScrollerInnerRef.current) return;
    
    const clientX = getClientX(e);
    
    const deltaX = clientX - startMouseX.current;
    
    const duration = scrollerAnim.current.duration();
    const loopDistance = scrollWidthRef.current;
    
    const ratio = duration / loopDistance; 

    let newTime = startTime.current - (deltaX * ratio);
    
    newTime = gsap.utils.wrap(0, duration, newTime); 
    
    scrollerAnim.current.time(newTime); 

  }, []);

  // --- MOUSE DOWN: Starts the drag ---
  const handleMouseDown = useCallback((e: React.MouseEvent | TouchEvent | MouseEvent) => {
    if (!techScrollerRef.current || !scrollerAnim.current) return;
    
    if (e instanceof MouseEvent && e.button !== 0) return;
    
    e.preventDefault();

    isDragging.current = true;
    
    startMouseX.current = getClientX(e as DragEvent);
    startTime.current = scrollerAnim.current.time();
    
    scrollerAnim.current.pause();
    
    document.addEventListener('mousemove', handleMouseMove as EventListener);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleMouseMove as EventListener);
    document.addEventListener('touchend', handleMouseUp);
  }, [handleMouseMove, handleMouseUp]);


  // Effect hook
  useEffect(() => {
    
    const scroller = techScrollerRef.current;
    const scrollerInner = techScrollerInnerRef.current;

    const handleScrollerMoveSpeed = (e: MouseEvent) => {
        if (!scroller || isDragging.current) return;
        const { clientX } = e;
        const { offsetWidth, offsetLeft } = scroller;
        const xPos = (clientX - offsetLeft) / offsetWidth;
        const timeScale = gsap.utils.mapRange(0, 1, 0.5, 2, xPos);
        if (scrollerAnim.current) {
            gsap.to(scrollerAnim.current, {
                timeScale: timeScale,
                duration: 0.5,
                ease: 'power1.out',
            });
        }
    };

    const handleScrollerLeaveSpeed = () => {
        if (scrollerAnim.current && !isDragging.current) {
            gsap.to(scrollerAnim.current, {
                timeScale: 1, // Reset to normal speed
                duration: 0.5,
                ease: 'power1.out',
            });
        }
    };

    if (scroller && scrollerInner) {
      const techCards = gsap.utils.toArray<HTMLElement>(scrollerInner.children);
      
      let scrollWidth = 0;
      const numCards = technologies.length;
      for (let i = 0; i < numCards; i++) {
        // Need to check if techCards[i] exists before accessing offsetWidth
        if (techCards[i]) {
          scrollWidth += techCards[i].offsetWidth + 24; // 24 is 1.5rem gap
        }
      }
      scrollWidthRef.current = scrollWidth;

      // Initialize the GSAP timeline
      scrollerAnim.current = gsap.timeline({
        repeat: -1,
        ease: 'none',
      });
      scrollerAnim.current.to(scrollerInner, {
        x: -scrollWidth,
        duration: 80, 
      });

      // Attach interaction listeners
      scroller.addEventListener('mousemove', handleScrollerMoveSpeed);
      scroller.addEventListener('mouseleave', handleScrollerLeaveSpeed);
      scroller.addEventListener('mousedown', handleMouseDown as EventListener);
      scroller.addEventListener('touchstart', handleMouseDown as EventListener);
    }

    // === CLEANUP FUNCTION ===
    return () => {
      if (scroller) {
        scroller.removeEventListener('mousemove', handleScrollerMoveSpeed);
        scroller.removeEventListener('mouseleave', handleScrollerLeaveSpeed);
        scroller.removeEventListener('mousedown', handleMouseDown as EventListener);
        scroller.removeEventListener('touchstart', handleMouseDown as EventListener);
      }
      
      // Drag cleanup (CRITICAL: Must remove document listeners)
      document.removeEventListener('mousemove', handleMouseMove as EventListener);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleMouseMove as EventListener);
      document.removeEventListener('touchend', handleMouseUp);
      
      gsap.killTweensOf([scroller, scrollerInner]);
    };

  }, [handleMouseDown, handleMouseMove, handleMouseUp]);


  return (
    <div id="services" className="py-20 bg-dark-bg">
      <div className="container mx-auto px-5">
        <h1 className="sub-title text-gradient-neon">Services</h1>
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {servicesData.map((service, index) => (
            <div
              key={index}
              className="bg-dark-card p-8 rounded-lg transform transition-transform duration-500 hover:-translate-y-2 hover:bg-brand-teal-hover"
            >
              <FontAwesomeIcon icon={service.icon} className="text-5xl mb-6 text-brand-teal" />
              <h2 className="text-2xl font-semibold mb-4">{service.title}</h2>
              <p className="text-dark-text">{service.description}</p>
              <a href="#" className="text-white inline-block mt-6 hover:text-brand-teal">
                Learn more
              </a>
            </div>
          ))}
        </div>

        {/* 🚀 NEW: Tech Scroller Section */}
        <div className="w-full max-w-6xl mx-auto mt-24">
          <div className="flex flex-col items-center mb-8">
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Technologies We Work With
            </p>
          </div>
          
          <div 
            ref={techScrollerRef}
            className="tech-scroller"
          >
            <div ref={techScrollerInnerRef} className="tech-scroller-inner">
              {/* We map the list twice for a seamless loop */}
              {[...technologies, ...technologies].map((tech, index) => (
                <div
                  key={`${tech.name}-${index}`}
                  className="tech-scroller-item"
                >
                  <tech.icon 
                    className="tech-scroller-item-icon" 
                    style={{ color: tech.color }} // Apply brand color
                  />
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Services;