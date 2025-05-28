'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Joystick, Menu, X } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur bg-white/5 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-xl">
            <Link href="/" className="flex items-center font-medium text-[#f1f0e7]">
              <Joystick color="#f1f0e7" size={24} className="mr-2" />
              Boy<b>Art</b>Cad
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-6 items-center">
            <Link href="/about" className="text-[#f1f0e7] hover:underline">About</Link>
            <Link href="/projects" className="text-[#f1f0e7] hover:underline">Projects</Link>
            <Link
              href="/contact"
              className="px-4 py-2 bg-[#f1f0e7] text-[#1a1a1a] rounded-lg hover:bg-[#f1f0e7]/90 transition"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Burger */}
          <button
            className="md:hidden text-[#f1f0e7]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>
      </div>

      {/* Mobile Nav Drawer */}
      {isOpen && (
        <div className="md:hidden fixed top-16 left-0 w-full bg-[#1a1a1a] text-[#f1f0e7] px-6 py-4 shadow-lg transition-all z-40">
          <div className="flex flex-col space-y-4">
            <Link href="/about" onClick={() => setIsOpen(false)} className="hover:underline">
              About
            </Link>
            <Link href="/projects" onClick={() => setIsOpen(false)} className="hover:underline">
              Projects
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="bg-[#f1f0e7] text-[#1a1a1a] px-4 py-2 rounded-lg hover:bg-[#f1f0e7]/90 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
