// 'use client'
// import React, {useEffect, useRef, useState} from 'react'
// import {PortableText} from '@portabletext/react'
// import type {PortableTextBlock} from '@portabletext/types'
// import Image from 'next/image'
// import '../styles/heroSection.css'
// import gsap from 'gsap'
// import {ScrollTrigger} from 'gsap/ScrollTrigger'
// import TextSlider from './TextSlider'

// gsap.registerPlugin(ScrollTrigger)

// interface HeroSectionProps {
//   data: {
//     title?: string
//     subtitle?: string
//     body?: PortableTextBlock[]
//     cta?: {
//       label?: string
//       urlType?: 'internal' | 'external'
//       internalLink?: string
//       externalUrl?: string
//     }
//     images?: Array<{
//       asset: {
//         _id: string
//         url: string
//       }
//       alt?: string
//       caption?: string
//     }>
//   }
// }

// export default function HeroSection({data}: HeroSectionProps) {
//   const heroRef = useRef(null)
//   const contentRef = useRef(null)
//   const carouselRef = useRef(null)

//   const finalUrl = data.cta?.urlType === 'internal' ? data.cta.internalLink : data.cta?.externalUrl

//   // Carousel state
//   const [currentSlide, setCurrentSlide] = useState(0)
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true)

//   // Prepare images array
//   const images = data.images || []
//   const totalImages = images.length

//   // Auto-advance carousel
//   useEffect(() => {
//     if (!isAutoPlaying || totalImages <= 1) return

//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % totalImages)
//     }, 4000)

//     return () => clearInterval(interval)
//   }, [isAutoPlaying, totalImages])

//   // GSAP animations
//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: heroRef.current,
//           start: 'top 85%',
//         },
//       })

//       tl.from('.hero-title', {
//         y: 40,
//         opacity: 0,
//         duration: 0.8,
//         ease: 'power2.out',
//       })
//         .from(
//           '.hero-subtitle',
//           {
//             y: 30,
//             opacity: 0,
//             duration: 0.6,
//             ease: 'power2.out',
//           },
//           '-=0.4',
//         )
//         .from(
//           '.hero-body',
//           {
//             y: 20,
//             opacity: 0,
//             duration: 0.6,
//             ease: 'power2.out',
//           },
//           '-=0.3',
//         )
//         .from(
//           '.hero-cta',
//           {
//             scale: 0.95,
//             opacity: 0,
//             duration: 0.5,
//             ease: 'power2.out',
//           },
//           '-=0.3',
//         )

//       if (carouselRef.current) {
//         gsap.from(carouselRef.current, {
//           x: 100,
//           opacity: 0,
//           duration: 1,
//           ease: 'power2.out',
//           scrollTrigger: {
//             trigger: carouselRef.current,
//             start: 'top 85%',
//           },
//         })
//       }
//     }, heroRef)

//     return () => ctx.revert()
//   }, [])

//   const goToSlide = (index: number) => {
//     setCurrentSlide(index)
//   }

//   const goToPrevious = () => {
//     setCurrentSlide((prev) => (prev - 1 + totalImages) % totalImages)
//   }

//   const goToNext = () => {
//     setCurrentSlide((prev) => (prev + 1) % totalImages)
//   }

//   const heading = data.title || ''
//   const subtitle = data.subtitle || ''
//   const body = data.body || []
//   const cta = data.cta

//   return (
//     <section className="hero-section" ref={heroRef}>
//       <div className="hero-grid">
//         {/* Content Area */}
//         <div className="hero-content" ref={contentRef}>
//           <div
//             className="hero-subtitle"
//             style={{
//               width: 'fit-content',
//               borderRadius: '1.5rem',
//             }}
//           >
//             <span>{subtitle}</span>
//           </div>

//           <h1 className="hero-title">
//             <TextSlider text={heading} />
//           </h1>

//           <div className="hero-body">
//             <PortableText value={body} />
//           </div>

//           <div className="hero-cta">
//             {cta?.label && (
//               <a
//                 href={finalUrl}
//                 target={data.cta?.urlType === 'external' ? '_blank' : '_self'}
//                 rel="noopener noreferrer"
//                 className="px-4 py-2 bg-[#1a1a1a] text-[#f1f0e7] rounded-lg hover:bg-[#1a1a1a]/90 transition"
//               >
//                 {data.cta?.label}
//               </a>
//             )}
//           </div>
//         </div>

//         {/* Carousel Area */}
//         {totalImages > 0 && (
//           <div
//             className="hero-carousel"
//             ref={carouselRef}
//             onMouseEnter={() => setIsAutoPlaying(false)}
//             onMouseLeave={() => setIsAutoPlaying(true)}
//           >
//             <div className="carousel-container">
//               <div
//                 className="carousel-track"
//                 style={{transform: `translateX(-${currentSlide * 100}%)`}}
//               >
//                 {images.map((image, index) => (
//                   <div key={image.asset._id || index} className="carousel-slide">
//                     <div className="carousel-image-wrapper">
//                       {/* Background blurred layer */}
//                       <div
//                         className="carousel-image-bg"
//                         style={{
//                           backgroundImage: `url(${image.asset.url})`,
//                         }}
//                       />
//                       {/* Foreground image */}
//                       <Image
//                         src={image.asset.url}
//                         alt={image.alt || `Hero image ${index + 1}`}
//                         width={800}
//                         height={600}
//                         className="carousel-image"
//                         quality={90}
//                         priority={index === 0}
//                         style={{
//                           objectFit: 'contain',
//                           maxHeight: '100%',
//                           maxWidth: '100%',
//                           zIndex: 2,
//                         }}
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Navigation */}
//               {totalImages > 1 && (
//                 <>
//                   <button
//                     onClick={goToPrevious}
//                     className="carousel-nav carousel-prev"
//                     aria-label="Previous image"
//                   >
//                     <svg
//                       width="20"
//                       height="20"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                     >
//                       <polyline points="15,18 9,12 15,6"></polyline>
//                     </svg>
//                   </button>

//                   <button
//                     onClick={goToNext}
//                     className="carousel-nav carousel-next"
//                     aria-label="Next image"
//                   >
//                     <svg
//                       width="20"
//                       height="20"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                     >
//                       <polyline points="9,18 15,12 9,6"></polyline>
//                     </svg>
//                   </button>
//                 </>
//               )}
//             </div>

//             {/* Dots */}
//             {totalImages > 1 && (
//               <div className="carousel-dots">
//                 {images.map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => goToSlide(index)}
//                     className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
//                     aria-label={`Go to slide ${index + 1}`}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </section>
//   )
// }
'use client'
import React, { useEffect, useRef, useState } from 'react'
import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextSlider from './TextSlider'
import {  ChevronLeft, ChevronRight } from "lucide-react";

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

export default function HeroSection({ data }: HeroSectionProps) {
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
    <section 
      ref={heroRef}
      className="relative w-full h-[90vh] flex items-center px-4 pt-24 pb-4 sm:px-6 md:px-8 lg:px-8 lg:pt-40 xl:px-12 xl:pt-20 2xl:h-[80vh]"
    >
      <div className="w-full max-w-[1400px] mx-auto grid gap-8 items-center grid-cols-1 grid-rows-[auto_auto] md:gap-12 md:grid-cols-2 md:grid-rows-1 lg:gap-16 xl:gap-20 xl:max-w-[1600px] [grid-template-areas:'content''carousel'] md:[grid-template-areas:'content_carousel'] lg:grid-cols-[1.2fr_1fr]">
        
        {/* Content Area */}
        <div 
          ref={contentRef}
          className="[grid-area:content] flex flex-col gap-6 text-center md:text-left md:gap-8 lg:gap-8 xl:gap-10"
        >
          <div className="hero-subtitle w-fit rounded-3xl mx-auto md:mx-0">
            <span className="text-sm font-normal text-[#1a1a1a] leading-[1.4] sm:text-base md:text-lg lg:text-xl xl:text-2xl">
              {subtitle}
            </span>
          </div>

          <h1 className="hero-title text-4xl font-bold leading-[1.1] text-[#1a1a1a] m-0 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
            <TextSlider text={heading} />
          </h1>

          <div className="hero-body text-sm font-normal text-[#1a1a1a] leading-[1.4] sm:text-base md:text-lg lg:text-xl xl:text-xl">
            <PortableText 
              value={body}
              components={{
                block: {
                  normal: ({ children }) => (
                    <p className="mb-4 last:mb-0 text-sm font-normal sm:text-base md:text-lg lg:text-xl xl:text-xl">
                      {children}
                    </p>
                  ),
                },
              }}
            />
          </div>

          <div className="hero-cta flex justify-center md:justify-start">
            {cta?.label && (
              <a
                href={finalUrl}
                target={data.cta?.urlType === 'external' ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#1a1a1a] text-[#f1f0e7] rounded-lg hover:bg-[#1a1a1a]/90 transition-colors duration-200 font-medium text-base"
              >
                {data.cta?.label}
              </a>
            )}
          </div>
        </div>

        {/* Carousel Area */}
        {totalImages > 0 && (
          <div
            ref={carouselRef}
            className="[grid-area:carousel] relative w-full"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div className="relative w-full h-[300px] overflow-hidden rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px]">
              <div
                className="flex w-full h-full transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {images.map((image, index) => (
                  <div key={image.asset._id || index} className="min-w-full flex justify-center items-center p-4 h-auto">
                    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                      {/* Background blurred layer */}
                      <div
                        className="absolute inset-0 bg-cover bg-center blur-[20px] scale-110 z-[1]"
                        style={{
                          backgroundImage: `url(${image.asset.url})`,
                        }}
                      />
                      
                      {/* Foreground image */}
                      <Image
                        src={image.asset.url}
                        alt={image.alt || `Hero image ${index + 1}`}
                        width={800}
                        height={600}
                        className="max-h-[500px] max-w-full w-auto h-auto object-contain z-[2] relative"
                        quality={90}
                        priority={index === 0}
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
                    className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/90 backdrop-blur-[10px] border-none w-10 h-10 rounded-full flex items-center justify-center cursor-pointer text-[#1a1a1a] transition-all duration-300 z-10 hover:bg-white hover:scale-110 md:w-11 md:h-11"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={goToNext}
                    className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/90 backdrop-blur-[10px] border-none w-10 h-10 rounded-full flex items-center justify-center cursor-pointer text-[#1a1a1a] transition-all duration-300 z-10 hover:bg-white hover:scale-110 md:w-11 md:h-11"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Dots */}
            {totalImages > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2.5 h-2.5 rounded-full border-none cursor-pointer transition-all duration-300 md:w-3 md:h-3 ${
                      index === currentSlide
                        ? 'bg-[#1a1a1a] scale-120'
                        : 'bg-[#1a1a1a]/30 hover:bg-[#1a1a1a]/60'
                    }`}
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