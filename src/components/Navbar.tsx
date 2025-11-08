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
  const [isScrolled, setIsScrolled] = useState<boolean>(false); // NEW: State for scroll transparency

  const navLinks: NavLink[] = [
    { href: '/#header', title: 'Home' },
    { href: '/#about', title: 'About' },
    { href: '/#services', title: 'Services' },
    { href: '/#portfolio', title: 'Portfolio' },
    { href: '/blog', title: 'Blog' },
    { href: '/#contact', title: 'Contact' },
  ];

  // NEW: Scroll event listener to toggle transparency
  useEffect(() => {
    const handleScroll = () => {
      // Set scroll state based on vertical scroll position (e.g., 50px)
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // NEW: Dynamic Navbar classes
  const navbarClasses = `
    fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out
    ${isScrolled 
      ? 'bg-dark-bg bg-opacity-80 backdrop-blur-sm shadow-lg' // Solid/Blurred when scrolled
      : 'bg-transparent' // Transparent when at the top
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
      <div className="container mx-auto px-5 py-3 flex justify-between items-center">
        <Link href="/">
          {/* LOGO SIZE FIX: Use smaller container and fill */}
          <div className="relative w-28 h-7 md:w-36 md:h-9">
              <Image 
                src="/images/s.png" 
                alt="SevenIsK Logo" 
                fill
                style={{ objectFit: 'contain' }}
                priority // Priority loading for the logo
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
          className="md:hidden text-white text-2xl z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} />
        </button>

        {/* Mobile Menu (Slide-in) */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="md:hidden fixed top-0 right-0 w-64 h-screen bg-brand-teal-dark p-6 z-40"
            >
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