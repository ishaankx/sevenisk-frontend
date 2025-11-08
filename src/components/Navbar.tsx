// src/components/Navbar.tsx

'use client';

import React, { useState, useEffect } from 'react'; 
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence, Variants, Transition } from 'framer-motion';

interface NavLink {
  href: string;
  title: string;
}

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false); 

  // CRITICAL FIX: RESTORING THE NAVLINKS ARRAY
  const navLinks: NavLink[] = [
    { href: '/#header', title: 'Home' },
    { href: '/#about', title: 'About' },
    { href: '/#services', title: 'Services' },
    { href: '/#portfolio', title: 'Portfolio' },
    { href: '/blog', title: 'Blog' },
    { href: '/#contact', title: 'Contact' },
  ];
  // END CRITICAL FIX

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navbarClasses = `
    fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out
    ${isScrolled 
      ? 'bg-dark-bg bg-opacity-80 backdrop-blur-sm shadow-lg' 
      : 'bg-transparent' 
    }
  `;

  const slideInTransition: Transition = { type: 'tween', duration: 0.3 };

  const mobileMenuVariants: Variants = {
    hidden: { x: '100%' },
    visible: { x: 0, transition: slideInTransition },
    exit: { x: '100%', transition: slideInTransition },
  };

  return (
    <nav className={navbarClasses}>
      {/* Container Padding and Flex Layout */}
      <div className="container mx-auto px-5 py-4 flex justify-between items-center">
        
        <Link href="/">
          {/* LOGO SIZE FIX */}
          <div className="relative w-48 h-12"> 
              <Image 
                src="/images/s.png" 
                alt="SevenIsK Logo" 
                fill
                style={{ objectFit: 'contain' }}
                priority 
              />
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6"> 
          {navLinks.map((link) => (
            <li key={link.title}>
              <Link href={link.href} className="text-white text-lg nav-link">
                {link.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl z-50 mr-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} />
        </button>

        {/* Mobile Menu (Slide-in) - Glassmorphism Effect */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={mobileMenuVariants} 
              initial="hidden"
              animate="visible"
              exit="exit"
              // New Glassmorphism style with explicit opacity to ensure transparency
              className="md:hidden fixed top-0 right-0 w-64 h-screen p-6 z-40 shadow-2xl backdrop-blur-md"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }} 
            >
              {/* MAPPING THE RESTORED LINKS HERE */}
              <ul className="flex flex-col space-y-6 mt-20">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white text-xl"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;