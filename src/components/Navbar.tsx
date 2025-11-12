// src/components/Navbar.tsx

'use client';

import React, { useState, useEffect } from 'react'; 
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// UPDATED: faChevronDown is still needed for mobile, so it stays.
import { faBars, faXmark, faChevronDown } from '@fortawesome/free-solid-svg-icons'; 
import { motion, AnimatePresence, Variants, Transition } from 'framer-motion';

interface NavLink {
  href: string;
  title: string;
}

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false); 
  
  const [isDesktopAboutOpen, setIsDesktopAboutOpen] = useState<boolean>(false);
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState<boolean>(false);

  const navLinks: NavLink[] = [
    { href: '/#header', title: 'Home' },
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

  const dropdownVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  return (
    <nav className={navbarClasses}>
      <div className="w-full px-5 py-4 flex justify-between items-center">
        
        <Link href="/">
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

        {/* --- Desktop Menu (UPDATED) --- */}
        <ul className="hidden md:flex space-x-6 items-center"> 
          {navLinks.filter(l => l.title === 'Home').map((link) => (
            <li key={link.title}>
              <Link href={link.href} className="text-white text-lg nav-link">
                {link.title}
              </Link>
            </li>
          ))}

          {/* NEW: Desktop "About" Dropdown */}
          <li 
            className="relative"
            onMouseEnter={() => setIsDesktopAboutOpen(true)}
            onMouseLeave={() => setIsDesktopAboutOpen(false)}
          >
            <Link 
              href="/#about" 
              // UPDATED: Removed the flex items-center and gap-1
              className="text-white text-lg nav-link"
            >
              About
              {/* UPDATED: Removed the FontAwesomeIcon component */}
            </Link>
            <AnimatePresence>
              {isDesktopAboutOpen && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute top-full left-0 mt-2 w-48 bg-dark-bg bg-opacity-90 backdrop-blur-sm rounded-lg shadow-xl"
                >
                  <ul className="flex flex-col p-2">
                    <li>
                      <Link 
                        href="/#about" 
                        className="block px-4 py-2 text-white hover:bg-brand-teal rounded"
                        onClick={() => setIsDesktopAboutOpen(false)}
                      >
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/about-founder" 
                        className="block px-4 py-2 text-white hover:bg-brand-teal rounded"
                        onClick={() => setIsDesktopAboutOpen(false)}
                      >
                        About Founder
                      </Link>
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
          
          {navLinks.filter(l => l.title !== 'Home').map((link) => (
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

        {/* --- Mobile Menu (Unchanged) --- */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={mobileMenuVariants} 
              initial="hidden"
              animate="visible"
              exit="exit"
              className="md:hidden fixed top-0 right-0 w-64 h-screen p-6 z-40 shadow-2xl backdrop-blur-md"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }} 
            >
              <ul className="flex flex-col space-y-6 mt-20">
                {navLinks.filter(l => l.title === 'Home').map((link) => (
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

                {/* Mobile "About" Dropdown (Unchanged) */}
                <li>
                  <button
                    className="text-white text-xl w-full flex justify-between items-center"
                    onClick={() => setIsMobileAboutOpen(!isMobileAboutOpen)}
                  >
                    <span>About</span>
                    <FontAwesomeIcon 
                      icon={faChevronDown} 
                      className={`w-3 h-3 transition-transform ${isMobileAboutOpen ? 'rotate-180' : ''}`} 
                    />
                  </button>
                  <AnimatePresence>
                    {isMobileAboutOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <ul className="flex flex-col space-y-4 pl-4 pt-4">
                          <li>
                            <Link 
                              href="/#about" 
                              className="text-white text-lg"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              About Us
                            </Link>
                          </li>
                          <li>
                            <Link 
                              href="/about-founder" 
                              className="text-white text-lg"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              About Founder
                            </Link>
                          </li>
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>

                {navLinks.filter(l => l.title !== 'Home').map((link) => (
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