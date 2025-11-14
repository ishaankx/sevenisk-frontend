// src/components/Projects.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard from './ProjectCard';
import { projects } from '@/data/projectsData'; // Adjust path if necessary

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (sectionRef.current) {
      // Zoom in effect for the entire section
      gsap.fromTo(
        sectionRef.current,
        { scale: 0.9 },
        {
          scale: 1,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%', // When top of section hits 80% of viewport
            end: 'top 20%',  // When top of section hits 20% of viewport
            scrub: true,
            // markers: true, // For debugging
          },
        }
      );

      // Staggered fade-in for project cards
      gsap.fromTo(
        cardsRef.current,
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.2, // Each card animates 0.2 seconds after the previous
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%', // When top of section hits 70% of viewport
            // markers: true, // For debugging
          },
        }
      );

      // Title fade-in
      gsap.fromTo(
        titleRef.current,
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 90%',
            // markers: true, // For debugging
          },
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-zinc-900 to-black text-white relative z-10 min-h-screen flex flex-col justify-center items-center">
      <h2 ref={titleRef} className="text-4xl md:text-5xl font-extrabold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-400 to-indigo-500">
        My Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {projects.map((project, index) => (
          <div key={project.id} ref={(el) => { cardsRef.current[index] = el; }} className="project-card-wrapper">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;