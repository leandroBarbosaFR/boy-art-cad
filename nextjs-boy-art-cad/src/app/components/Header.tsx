'use client'

import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import {Joystick, Menu, X} from 'lucide-react'
import {client} from '../../sanity/client'
import useScrollPosition from '../../hooks/useScrollPosition'
import {usePathname, useSearchParams} from 'next/navigation'
import '../styles/header.css'

const HEADER_QUERY = `*[_type == "header"][0]{
  links[]{
    _key,
    _type,
    openInNewTab,
    text,
    external,
    anchor,
    internal->{
      _type,
      _ref,
      slug
    }
  }
}`

const navCta = ['Bornes', 'Cassette', 'Tableaux']

interface HeaderLink {
  _key: string
  _type: string
  text: string
  openInNewTab: boolean
  external?: string
  anchor?: string
  internal?: {
    _ref: string
    _type: string
    slug?: {
      current: string
    }
  }
}

function resolveLinkHref(link: HeaderLink): string {
  if (link.external) return link.external
  if (link.anchor) return link.anchor
  if (link.internal?._type === 'category') {
    return `/collection?category=${link.internal.slug?.current}`
  }
  if (link.internal?.slug?.current) {
    return `/${link.internal.slug.current}`
  }
  return '#'
}

function isLinkActive(link: HeaderLink, pathname: string, searchParams: URLSearchParams): boolean {
  const href = resolveLinkHref(link)

  // Handle category links specially
  if (link.internal?._type === 'category') {
    const currentCategory = searchParams.get('category')
    return pathname === '/collection' && currentCategory === link.internal.slug?.current
  }

  // Handle collection page without category (general collection link)
  if (href === '/collection') {
    const currentCategory = searchParams.get('category')
    return pathname === '/collection' && !currentCategory
  }

  // Handle other links
  return pathname === href
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [links, setLinks] = useState<HeaderLink[]>([])
  const scrolled = useScrollPosition(10)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const fetchHeader = async () => {
      const data = await client.fetch<{links: HeaderLink[]}>(HEADER_QUERY)
      setLinks(data?.links || [])
    }
    fetchHeader()
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1020)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const paddingStyle = isMobile
    ? scrolled
      ? '8px 10px'
      : '10px 10px'
    : scrolled
      ? '8px 10px'
      : '10px 10px'

  return (
    <header
      className="fixed top-0 w-full z-50 bg-[#f1f0e7] header-transition"
      style={{padding: paddingStyle}}
    >
      <div className="px-4 flex justify-between sm:px-6 lg:px-8">
        <nav className="flex justify-between w-full items-center h-16">
          <div className="text-xl">
            <Link href="/" className="flex items-center font-medium text-[#1a1a1a]">
              <Joystick color="#1a1a1a" size={24} className="mr-2" />
              Boy<b>Art</b>Cad
            </Link>
          </div>

          {/* Desktop */}
          <div className="hidden lg:flex gap-6 items-center">
            {links.map((link) => {
              const href = resolveLinkHref(link)
              const isActive = isLinkActive(link, pathname, searchParams)
              return (
                <Link
                  key={link._key}
                  href={href}
                  className={`px-4 py-2 rounded-lg transition ${
                    isActive
                      ? 'bg-[#1a1a1a] text-[#f1f0e7]'
                      : 'text-[#1a1a1a] hover:text-[#f1f0e7] hover:bg-[#1a1a1a]/90'
                  }`}
                  target={link.openInNewTab ? '_blank' : '_self'}
                >
                  {link.text}
                </Link>
              )
            })}
            {/* CTA Navigation Items */}
            {navCta.map((item, index) => (
              <Link
                key={index}
                href={`/${item.toLowerCase()}`}
                className={`px-4 py-2 rounded-lg transition ${
                  pathname === `/${item.toLowerCase()}`
                    ? 'bg-[#1a1a1a] text-[#f1f0e7]'
                    : 'text-[#1a1a1a] hover:text-[#f1f0e7] hover:bg-[#1a1a1a]/90'
                }`}
              >
                {item}
              </Link>
            ))}
            <Link
              href="/contact"
              className="px-4 py-2 bg-[#1a1a1a] text-[#f1f0e7] rounded-lg hover:bg-[#1a1a1a]/90 transition"
            >
              Prendre contact
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-[#1a1a1a]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div
          className="nav-draw-wrapper lg:hidden fixed top-16 left-0 w-full backdrop-blur bg-[#f1f0e7] text-[#1a1a1a] px-6 py-4 shadow-lg transition-all z-40"
          style={{height: '100vh'}}
        >
          <div className="flex flex-col space-y-4">
            {/* Dynamic links from Sanity */}
            {links.map((link) => {
              const href = resolveLinkHref(link)
              const isActive = isLinkActive(link, pathname, searchParams)
              return (
                <Link
                  key={link._key}
                  href={href}
                  onClick={() => setIsOpen(false)} // ✅ close drawer on click
                  className={`px-4 py-2 transition border-b border-[#1a1a1a]/30 ${
                    isActive
                      ? 'bg-[#1a1a1a] text-[#f1f0e7]'
                      : 'text-[#1a1a1a] hover:bg-[#1a1a1a]/90 hover:text-[#f1f0e7]'
                  }`}
                  target={link.openInNewTab ? '_blank' : '_self'}
                >
                  {link.text}
                </Link>
              )
            })}

            {/* CTA Navigation Items with bottom border + close on click */}
            {navCta.map((item, index) => (
              <Link
                key={index}
                href={`/${item.toLowerCase()}`}
                onClick={() => setIsOpen(false)} // ✅ close drawer on click
                className={`px-4 py-2 transition border-b border-[#1a1a1a]/30 ${
                  pathname === `/${item.toLowerCase()}`
                    ? 'bg-[#1a1a1a] text-[#f1f0e7]'
                    : 'text-[#1a1a1a] hover:bg-[#1a1a1a]/90 hover:text-[#f1f0e7]'
                }`}
              >
                {item}
              </Link>
            ))}

            {/* Contact button: outlined by default, solid on hover */}
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)} // ✅ close drawer on click
              className="px-4 py-2 rounded-lg border border-[#1a1a1a] text-[#1a1a1a] transition hover:bg-[#1a1a1a] hover:text-[#f1f0e7]"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
