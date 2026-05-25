"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/about", label: "ABOUT" },
    { href: "/departments", label: "DEPARTMENTS" },
    { href: "/facilities", label: "FACILITIES" },
    { href: "/placements", label: "PLACEMENTS" },
    { href: "/contact", label: "CONTACT" },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-20 py-4 flex justify-between items-center">
        {/* Logo and Title */}
        <Link href="/" onClick={closeMenu} className="flex items-center gap-4">
          <div className="bg-college-blue p-2 rounded-full text-white font-bold text-xl w-12 h-12 flex items-center justify-center shrink-0">
            GPW
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-bold text-college-blue leading-tight uppercase">
              Government Polytechnic For Women
            </h1>
            <p className="text-[10px] md:text-xs text-gray-500 font-semibold tracking-widest uppercase">
              Guntur, Andhra Pradesh
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 font-semibold text-gray-700">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="hover:text-college-blue transition-colors text-sm tracking-wide"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Hamburger Icon */}
        <button 
          onClick={toggleMenu} 
          className="lg:hidden text-college-blue p-2 focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          <div className="space-y-1.5">
            <span className={`block w-6 h-0.5 bg-college-blue transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}></span>
            <span className={`block w-6 h-0.5 bg-college-blue transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}></span>
            <span className={`block w-6 h-0.5 bg-college-blue transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 py-4 px-6 animate-fade-in shadow-inner">
          <nav className="flex flex-col gap-4 font-semibold text-gray-700">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                onClick={closeMenu}
                className="hover:text-college-blue py-2 border-b border-gray-50 text-sm tracking-wider"
              >
                {link.label}
              </Link>
            ))}
            {/* Admin Login link in mobile menu */}
            <Link 
              href="/admin" 
              onClick={closeMenu}
              className="bg-college-blue text-white text-center py-3 rounded font-bold mt-4 hover:bg-blue-800 transition-colors text-xs tracking-wider"
            >
              ADMIN LOGIN
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
