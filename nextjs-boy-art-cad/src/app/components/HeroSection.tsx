'use client'
import React, {useEffect, useRef, useState} from 'react'
import {PortableText} from '@portabletext/react'
import type {PortableTextBlock} from '@portabletext/types'
import Image from 'next/image'
import '../styles/heroSection.css'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import TextSlider from './TextSlider'

gsap.registerPlugin(ScrollTrigger)

interface HeroSectionProps {
  data: {
    title?: string
    subtitle?: string
    body?: PortableTextBlock[]
    cta?: {
      label?: string
      urlType?: 'internal' | 'external'
      internalLink?: string
      externalUrl?: string
    }
    images?: Array<{
      asset: {
        _id: string
        url: string
      }
      alt?: string
      caption?: string
    }>
  }
}

export default function HeroSection({data}: HeroSectionProps) {
  const heroRef = useRef(null)
  const contentRef = useRef(null)
  const carouselRef = useRef(null)

  const finalUrl = data.cta?.urlType === 'internal' ? data.cta.internalLink : data.cta?.externalUrl

  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Prepare images array
  const images = data.images || []
  const totalImages = images.length

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying || totalImages <= 1) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalImages)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, totalImages])

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top 85%',
        },
      })

      tl.from('.hero-title', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      })
        .from(
          '.hero-subtitle',
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.4',
        )
        .from(
          '.hero-body',
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.3',
        )
        .from(
          '.hero-cta',
          {
            scale: 0.95,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out',
          },
          '-=0.3',
        )

      if (carouselRef.current) {
        gsap.from(carouselRef.current, {
          x: 100,
          opacity: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: carouselRef.current,
            start: 'top 85%',
          },
        })
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + totalImages) % totalImages)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalImages)
  }

  const heading = data.title || ''
  const subtitle = data.subtitle || ''
  const body = data.body || []
  const cta = data.cta

  return (
    <section className="hero-section" ref={heroRef}>
      <div className="hero-grid">
        {/* Content Area */}
        <div className="hero-content" ref={contentRef}>
          <div
            className="hero-subtitle"
            style={{
              width: 'fit-content',
              borderRadius: '1.5rem',
            }}
          >
            <span>{subtitle}</span>
          </div>

          <h1 className="hero-title">
            <TextSlider text={heading} />
          </h1>

          <div className="hero-body">
            <PortableText value={body} />
          </div>

          <div className="hero-cta">
            {cta?.label && (
              <a
                href={finalUrl}
                target={data.cta?.urlType === 'external' ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#1a1a1a] text-[#f1f0e7] rounded-lg hover:bg-[#1a1a1a]/90 transition"
              >
                {data.cta?.label}
              </a>
            )}
          </div>
        </div>

        {/* Carousel Area */}
        {totalImages > 0 && (
          <div
            className="hero-carousel"
            ref={carouselRef}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div className="carousel-container">
              <div
                className="carousel-track"
                style={{transform: `translateX(-${currentSlide * 100}%)`}}
              >
                {images.map((image, index) => (
                  <div key={image.asset._id || index} className="carousel-slide">
                    <div className="carousel-image-wrapper">
                      {/* Background blurred layer */}
                      <div
                        className="carousel-image-bg"
                        style={{
                          backgroundImage: `url(${image.asset.url})`,
                        }}
                      />
                      {/* Foreground image */}
                      <Image
                        src={image.asset.url}
                        alt={image.alt || `Hero image ${index + 1}`}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        priority={index === 0}
                        className="carousel-image"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation */}
              {totalImages > 1 && (
                <>
                  <button
                    onClick={goToPrevious}
                    className="carousel-nav carousel-prev"
                    aria-label="Previous image"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="15,18 9,12 15,6"></polyline>
                    </svg>
                  </button>

                  <button
                    onClick={goToNext}
                    className="carousel-nav carousel-next"
                    aria-label="Next image"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="9,18 15,12 9,6"></polyline>
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Dots */}
            {totalImages > 1 && (
              <div className="carousel-dots">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
