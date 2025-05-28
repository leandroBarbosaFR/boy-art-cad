'use client';

import React from 'react';
import Link from 'next/link';
import { Joystick } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[transparent] text-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo / Brand */}
          <div className="flex items-center text-xl font-medium">
            <Joystick size={20} className="mr-2" />
            Boy<b>Art</b>Cad
          </div>

          {/* Navigation Links */}
          <div className="flex gap-6 text-sm">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <Link href="/about" className="hover:underline">
              About
            </Link>
            <Link href="/projects" className="hover:underline">
              Projects
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} BoyArtCad. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
