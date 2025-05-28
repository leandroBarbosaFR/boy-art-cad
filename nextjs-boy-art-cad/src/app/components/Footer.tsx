'use client'

import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import {Joystick} from 'lucide-react'
import {client} from '../../sanity/client'

const FOOTER_QUERY = `*[_type == "footer"][0]{
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

interface FooterLink {
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

export default function Footer() {
  const [links, setLinks] = useState<FooterLink[]>([])

  useEffect(() => {
    const fetchFooter = async () => {
      const data = await client.fetch<{links: FooterLink[]}>(FOOTER_QUERY)
      setLinks(data?.links || [])
    }
    fetchFooter()
  }, [])

  return (
    <footer className="bg-[transparent] text-[#1a1a1a]">
      <div className=" px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo / Brand */}
          <div className="flex items-center text-xl font-medium">
            <Joystick size={20} className="mr-2" />
            Boy<b>Art</b>Cad
          </div>

          {/* Navigation Links */}
          <div className="flex gap-6 text-sm">
            {links.map((link) => (
              <Link
                key={link._key}
                href={link.internal?.slug?.current ? `/${link.internal.slug.current}` : '#'}
                className="px-4 py-2 text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white rounded-lg transition"
                target={link.openInNewTab ? '_blank' : '_self'}
              >
                {link.text}
              </Link>
            ))}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} BoyArtCad. Tous droits réservés
        </div>
      </div>
    </footer>
  )
}
