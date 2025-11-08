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

  const navLinks: NavLink[] = [
    { href: '/#header', title: 'Home' },
    { href: '/#about', title: 'About' },
    { href: '/#services', title: 'Services' },
    { href: '/#portfolio', title: 'Portfolio' },
    { href: '/blog', title: 'Blog' },
    { href: '/#contact', title: 'Contact' },
  ];

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
      {/* 1. REDUCE CONTAINER PADDING */}
      {/* Change px-5 to px-4 or px-3 for smaller screens, and use px-5 only on large screens */}
      <div className="container mx-auto px-3 sm:px-4 lg:px-5 py-4 flex justify-between items-center">
        
        <Link href="/">
          {/* LOGO POSITION FIX: Increased negative margin to counteract container padding */}
          {/* Changed -ml-2 to -ml-3 or -ml-4 */}
          <div className="relative w-40 h-10 md:w-48 md:h-12 -ml-3 sm:-ml-4"> 
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
        <ul className="hidden md:flex space-x-6 -mr-3 sm:-mr-4"> {/* NEW: Negative margin to pull items right */}
          {navLinks.map((link) => (
            <li key={link.title}>
              <Link href={link.href} className="text-white text-lg nav-link">
                {link.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* ... (Mobile Menu Button and Mobile Menu logic remains the same) ... */}
        
      </div>
    </nav>
  );
};

export default Navbar;