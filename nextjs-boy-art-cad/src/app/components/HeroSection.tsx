'use client'
import React, { useEffect, useRef } from 'react'
import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import Image from 'next/image'
import { urlFor } from '../../lib/sanityImage'
import '../styles/heroSection.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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

export default function HeroSection({ data }: HeroSectionProps) {
  const headingRef = useRef(null)
  const subtitleRef = useRef(null)
  const bodyRef = useRef(null)
  const ctaRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: headingRef.current,
        start: 'top 85%',
      },
    })

    tl.from(headingRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    })
      .from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      }, "-=0.4")
      .from(bodyRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      }, "-=0.3")
      .from(ctaRef.current, {
        scale: 0.95,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
      }, "-=0.3")

    gsap.from(imageRef.current, {
      x: 100,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: imageRef.current,
        start: 'top 85%',
      },
    })
  }, [])

  const heading = data.title || ''
  const subtitle = data.subtitle || ''
  const body = data.body || []
  const image = data.image?.asset?.url
  const cta = data.cta

  return (
    <section className="relative h-screen hero-section-wrapper">
      <div className="hero-section-container absolute z-20 justify-items-center">
        <h1 className="hero-title" ref={headingRef}>
          {heading}
        </h1>
        <div className="hero-subtitle" ref={subtitleRef}>
          <h3>{subtitle}</h3>
        </div>
        <div className="hero-body" ref={bodyRef}>
          <PortableText value={body} />
        </div>
        <div className="hero-cta" ref={ctaRef}>
          {cta?.label && (
            <a href={cta.url} target="_blank" rel="noopener noreferrer">
              <button className="flex gap-2 bg-[#1a1a1a] text-[#f1f0e7] px-6 py-2 rounded hover:bg-[#1a1a1a]/90 transition-all cursor-pointer">
                {cta.label}
              </button>
            </a>
          )}
        </div>
        <div className='image-hero-wrapper'
          ref={imageRef}
        >
          {image && (
            <Image
              src={urlFor(data.image).width(7172).url()}
              alt="Hero image"
              width={7172}
              height={7172}
              style={{ objectFit: 'cover' }}
              quality={100}
              priority
            />
          )}
        </div>
      </div>
    </section>
  )
}
