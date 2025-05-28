'use client'

import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import {Joystick, Menu, X} from 'lucide-react'
import {client} from '../../sanity/client'
import useScrollPosition from '../../hooks/useScrollPosition'

const HEADER_QUERY = `*[_type == "header"][0]{
  links[]{
    _key,
    _type,
    openInNewTab,
    text,
    internal
  }
}`

interface HeaderLink {
  _key: string
  _type: string
  internal?: {
    _ref: string
    _type: string
  }
  openInNewTab: boolean
  text: string
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [links, setLinks] = useState<HeaderLink[]>([])
  const scrolled = useScrollPosition(10)

  useEffect(() => {
    const fetchHeader = async () => {
      const data = await client.fetch<{links: HeaderLink[]}>(HEADER_QUERY)
      setLinks(data?.links || [])
    }
    fetchHeader()
  }, [])

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        scrolled ? 'backdrop-blur bg-[#1a1a1ad4] shadow-md' : 'backdrop-blur bg-white/5 shadow-sm'
      }`}
    >
      <div className="px-4 flex justify-between sm:px-6 lg:px-8">
        <nav className="flex justify-between w-full items-center h-16">
          {/* Logo */}
          <div className="text-xl">
            <Link href="/" className="flex items-center font-medium text-[#f1f0e7]">
              <Joystick color="#f1f0e7" size={24} className="mr-2" />
              Boy<b>Art</b>Cad
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-6 items-center">
            {links.map((link) => (
              <Link
                key={link._key}
                href={`/${link.text.toLowerCase()}`}
                className="px-4 py-2 bg-[#f1f0e7] text-[#1a1a1a] rounded-lg hover:bg-[#f1f0e7]/90 transition"
                target={link.openInNewTab ? '_blank' : '_self'}
              >
                {link.text}
              </Link>
            ))}
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
            {links.map((link) => (
              <Link
                key={link._key}
                href={`/${link.text.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className={`${
                  link.text.toLowerCase() === 'contact'
                    ? 'bg-[#f1f0e7] text-[#1a1a1a] px-4 py-2 rounded-lg hover:bg-[#f1f0e7]/90 transition'
                    : 'hover:underline'
                }`}
                target={link.openInNewTab ? '_blank' : '_self'}
              >
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
