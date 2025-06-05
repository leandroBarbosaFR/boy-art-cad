'use client'
import React, {useEffect, useRef} from 'react'
import {PortableText} from '@portabletext/react'
import type {PortableTextBlock} from '@portabletext/types'
import Image from 'next/image'
import {urlFor} from '../../lib/sanityImage'
import '../styles/textImageSection.css'
import CrabSvg from '../components/CrabSvg'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface TextImageSectionProps {
  data: {
    title?: string
    subtitle?: string
    body?: PortableTextBlock[]
    image?: {
      asset: {
        _id: string
        url: string
      }
      alt?: string
    }
    cta?: {
      label?: string
      url?: string
    }
  }
}

export default function TextImageSection({data}: TextImageSectionProps) {
  const sectionRef = useRef(null)
  const bodyRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    gsap.fromTo(
      el,
      {autoAlpha: 0, y: 100},
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )

     // Slide body from right to left
    gsap.fromTo(
      bodyRef.current,
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: bodyRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [])

  const heading = data.title || ''
  const subtitle = data.subtitle || ''
  const body = data.body || []
  const image = data.image?.asset?.url
  const cta = data.cta

  return (
    <section ref={sectionRef} className="textImgSection-wrapper">
      <div className="textImageSection-bg-section">
        <CrabSvg />
      </div>
      <div className="textImgSection-container">
        <div className="grid-text-section">
          <div className="heading-wrapper">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[56px]">
              {heading}
            </h1>
          </div>
          <div className="subtitle-wrapper">
            <h3>{subtitle}</h3>
          </div>
          <div ref={bodyRef} className="body-wrapper">
            <PortableText value={body} />
          </div>
          <div className="cta-wrapper">
            {cta?.label && (
              <a href={cta.url} target="_blank" rel="noopener noreferrer">
                <button className="bg-[#353229] text-white px-6 py-2 rounded hover:bg-[#353229]/90 transition-all cursor-pointer">
                  {cta.label}
                </button>
              </a>
            )}
          </div>
          <div className="image-wrapper">
            {image && (
              <Image
                width={3419}
                height={3564}
                src={urlFor(data.image).width(3419).url()}
                alt="text image section"
                quality={100}
                priority
                className="image-section"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
