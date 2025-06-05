'use client'

import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import {Joystick, Menu, X} from 'lucide-react'
import {client} from '../../sanity/client'
import useScrollPosition from '../../hooks/useScrollPosition'
import '../styles/header.css'

const HEADER_QUERY = `*[_type == "header"][0]{
   links[]{
    _key,
    _type,
    openInNewTab,
    text,
    internal->{
      _type,
      _ref,
      slug
    }
  }
}`

interface HeaderLink {
  _key: string
  _type: string
  internal?: {
    _ref: string
    _type: string
    slug?: {
      current: string
    }
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
  className={`fixed top-0 w-full z-50 bg-[#f1f0e7] header-transition`}
  style={{
    padding: scrolled ? '10px 20px' : '30px 20px',
  }}
>
      <div className="px-4 flex justify-between sm:px-6 lg:px-8">
        <nav className="flex justify-between w-full items-center h-16">
          {/* Logo */}
          <div className="text-xl">
            <Link href="/" className="flex items-center font-medium text-[#353229]">
              <Joystick color="#353229" size={24} className="mr-2" />
              Boy<b>Art</b>Cad
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-6 items-center">
            {links.map((link) => (
              <Link
                key={link._key}
                href={link.internal?.slug?.current ? `/${link.internal.slug.current}` : '#'}
                className="px-4 py-2 text-[#353229] rounded-lg hover:text-[#f1f0e7] hover:bg-[#353229]/90 transition"
                target={link.openInNewTab ? '_blank' : '_self'}
              >
                {link.text}
              </Link>
            ))}
              <Link
                href="/contact"
                className="px-4 py-2 bg-[#353229] text-[#f1f0e7] rounded-lg hover:bg-[#353229]/90 transition"
              >
                Contact
              </Link>
          </div>

          {/* Mobile Burger */}
          <button
            className="md:hidden text-[#353229]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>
      </div>

      {/* Mobile Nav Drawer */}
      {isOpen && (
        <div
          className="md:hidden fixed top-16 left-0 w-full backdrop-blur bg-[#f1f0e7] shadow-md text-[#353229] px-6 py-4 shadow-lg transition-all z-40"
          style={{height: '100vh'}}
        >
          <div className="flex flex-col space-y-4">
            {links.map((link) => (
              <Link
                key={link._key}
                href={link.internal?.slug?.current ? `/${link.internal.slug.current}` : '#'}
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-[transparent] text-[#353229] hover:bg-[#353229]/90 transition border-b border-[#353229]/30"
                target={link.openInNewTab ? '_blank' : '_self'}
              >
                {link.text}
              </Link>
            ))}
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-[#353229] text-[#f1f0e7] rounded-lg hover:bg-[#353229]/90 transition"
              >
                Contact
              </Link>
          </div>
        </div>
      )}
    </header>
  )
}
