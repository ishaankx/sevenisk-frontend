'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence, Variants, Transition } from 'framer-motion'; // Import Variants and Transition

interface NavLink {
  href: string;
  title: string;
}

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const navLinks: NavLink[] = [
    { href: '/#header', title: 'Home' },
    { href: '/#about', title: 'About' },
    { href: '/#services', title: 'Services' },
    { href: '/#portfolio', title: 'Portfolio' },
    { href: '/blog', title: 'Blog' },
    { href: '/#contact', title: 'Contact' },
  ];

  // --- THIS IS THE FIX ---
  // We define the transition type explicitly
  const slideInTransition: Transition = { type: 'tween', duration: 0.3 };

  const mobileMenuVariants: Variants = {
    hidden: { x: '100%' },
    visible: { x: 0, transition: slideInTransition },
    exit: { x: '100%', transition: slideInTransition },
  };
  // --- END OF FIX ---

  return (
    <nav className="fixed top-0 left-0 w-full bg-dark-bg bg-opacity-80 backdrop-blur-sm z-50">
      <div className="container mx-auto px-5 py-4 flex justify-between items-center">
        <Link href="/">
          {/* Logo from index.html */}
          <Image src="/images/s.png" alt="SevenIsK Logo" width={200} height={50} className="w-48 md:w-56" />
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
              variants={mobileMenuVariants} // This now uses the correctly typed object
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
                      onClick={() => setIsMenuOpen(false)} // Close menu on click
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