'use client';

import React from 'react';
import Link from 'next/link';
import { Joystick } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur bg-white/5shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-xl">
            <Link href="/" className="flex items-center font-medium text-[#f1f0e7]">
              <Joystick color="#f1f0e7" size={24} className="mr-2" />
              Boy<b>Art</b>Cad
            </Link>
          </div>

          {/* CTA or Navigation */}
          <div>
            <Link
              href="/contact"
              className="px-4 py-2 bg-[#f1f0e7] text-[#1a1a1a] rounded-lg hover:bg-[#f1f0e7]/90 transition"
            >
              Contact Us
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
