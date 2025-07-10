'use client'
import React, {useEffect, useRef} from 'react'
import {PortableText} from '@portabletext/react'
import type {PortableTextBlock} from '@portabletext/types'
import Image from 'next/image'
import {urlFor} from '../../lib/sanityImage'
import '../styles/textImageSection.css'
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
  const contentRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section entrance animation
      gsap.fromTo(
        sectionRef.current,
        {autoAlpha: 0, y: 50},
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        },
      )

      // Content animation
      gsap.fromTo(
        '.text-content-item',
        {x: -50, opacity: 0},
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        },
      )

      // Image animation
      gsap.fromTo(
        imageRef.current,
        {x: 100, opacity: 0, scale: 0.9},
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const heading = data.title || ''
  const subtitle = data.subtitle || ''
  const body = data.body || []
  const image = data.image?.asset?.url
  const cta = data.cta

  return (
    <section ref={sectionRef} className="textImg-section">
      {/* <div className="textImg-background"></div> */}

      <div className="textImg-container">
        <div className="textImg-grid">
          {/* Content Area */}
          <div className="textImg-content" ref={contentRef}>
            {subtitle && (
              <div className="textImg-subtitle text-content-item">
                <h3>{subtitle}</h3>
              </div>
            )}

            {heading && (
              <div className="textImg-title text-content-item">
                <h1>{heading}</h1>
              </div>
            )}

            {body.length > 0 && (
              <div className="textImg-body text-content-item">
                <PortableText value={body} />
              </div>
            )}

            {cta?.label && (
              <div className="textImg-cta text-content-item">
                <a href={cta.url} target="_blank" rel="noopener noreferrer">
                  <button className="px-4 py-2 bg-[#1a1a1a] text-[#f1f0e7] rounded-lg hover:bg-[#1a1a1a]/90 transition cursor-pointer">
                    {cta.label}
                  </button>
                </a>
              </div>
            )}
          </div>

          {/* Image Area */}
          {image && (
            <div className="textImg-image-wrapper" ref={imageRef}>
              <div className="textImg-image-container">
                <Image
                  src={urlFor(data.image).width(640).url()}
                  alt={data.image?.alt || 'Section image'}
                  width={640}
                  height={427}
                  quality={90}
                  priority
                  className="textImg-image"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
