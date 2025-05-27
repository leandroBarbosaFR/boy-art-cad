import React from 'react'
import {PortableText} from '@portabletext/react'
import type {PortableTextBlock} from '@portabletext/types'
import Image from 'next/image'
import {urlFor} from '../../lib/sanityImage'
import '../styles/heroSection.css'
import {ArrowRight} from 'lucide-react'

interface HeroSectionProps {
  data: {
    title?: string
    subtitle?: string
    body?: PortableTextBlock[]
    cta?: {
      label?: string
      url?: string
    }
    image?: {
      asset: {
        _id: string
        url: string
      }
      alt?: string
    }
  }
}

export default function HeroSection({data}: HeroSectionProps) {
  const heading = data.title || ''
  const subtitle = data.subtitle || ''
  const body = data.body || []
  const image = data.image?.asset?.url
  const cta = data.cta

  return (
    <section className="relative h-screen">
      {image && (
        <Image
          src={urlFor(data.image).width(7172).url()}
          alt="Hero image"
          fill
          style={{objectFit: 'cover'}}
          quality={100}
          priority
        />
      )}
      {/* overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/10"></div>
      <div className="justify-items-center hero-section-container absolute z-20">
        <h1 className="hero-title">{heading}</h1>
        <div className="hero-subtitle">
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[16px]">
            {subtitle}
          </h3>
        </div>
        <div className="hero-body">
          <PortableText value={body} />
        </div>
        <div className="hero-cta">
          {cta?.label && (
            <a href={cta.url} target="_blank" rel="noopener noreferrer">
              <button className="flex gap-2 bg-[#f1f0e7] text-[#1a1a1a] px-6 py-2 rounded hover:bg-[#f1f0e7]/90 transition-all cursor-pointer">
                {cta.label}
                <ArrowRight color="#1a1a1a" size={24} />
              </button>
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
