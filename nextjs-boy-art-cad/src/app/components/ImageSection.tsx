'use client'
import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import {urlFor} from '../../lib/sanityImage'
import '../styles/imageSection.css'
import CrabSvg from '../components/CrabSvg'
// import Link from 'next/link'

function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => setHasMounted(true), [])
  return hasMounted
}

interface ImageSectionProps {
  data: {
    title?: string
    images: {
      _key: string
      alt?: string
      asset: {
        _ref?: string
        _id?: string
      }
    }[]
  }
}

export default function ImageSection({data}: ImageSectionProps) {
  const hasMounted = useHasMounted()
  const [currentIndex, setCurrentIndex] = useState(0)

  const heading = data.title || ''
  const validImages = data.images?.filter((img) => img.asset?._ref || img.asset?._id) || []
  const totalImages = validImages.length

  const [cardsPerView, setCardsPerView] = useState(1)

  useEffect(() => {
    const getCardsPerView = () => {
      if (window.innerWidth >= 1460) return 4
      if (window.innerWidth >= 1020) return 3
      if (window.innerWidth >= 740) return 2
      return 1
    }
    setCardsPerView(getCardsPerView())
    const handleResize = () => setCardsPerView(getCardsPerView())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const maxIndex = Math.max(0, totalImages - cardsPerView)

  useEffect(() => {
    setCurrentIndex(0)
  }, [cardsPerView])

  const goToPrevious = () => setCurrentIndex((prev) => Math.max(0, prev - 1))
  const goToNext = () => setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))

  if (!hasMounted || totalImages === 0) return null

  const safeIndex = Math.min(currentIndex, maxIndex)

  return (
    <section className="imgSection-wrapper">
      <div className="imageSection-bg-section-px">
        <CrabSvg />
      </div>

      <div className="imgSection-container">
        {/* Header */}
        <div className="imgSection-header">
          <h1 className="imgSection-title">{heading}</h1>
        </div>

        {/* Carousel */}
        <div className="imgCards-carousel">
          <div className="imgCards-viewport">
            <div
              className="imgCards-container"
              style={{
                transform: `translateX(-${safeIndex * (100 / totalImages)}%)`,
                width: `${(totalImages * 100) / cardsPerView}%`,
                transition: `transform ${cardsPerView === 1 ? '0.8s' : '0.4s'} ease-in-out`,
              }}
            >
              {validImages.map((img, index) => (
                <div
                  key={img._key}
                  className="imgCard"
                  style={{width: `${100 / totalImages}%`, flexShrink: 0}}
                >
                  <div className="imgCard-inner">
                    <div
                      className="imgCard-blur-bg"
                      style={{
                        backgroundImage: `url(${urlFor(img).width(400).height(300).url()})`,
                      }}
                    />
                    <Image
                      width={400}
                      height={300}
                      src={urlFor(img).width(400).height(300).url()}
                      alt={img.alt || `Image ${index + 1}`}
                      quality={85}
                      className="imgCard-image"
                      priority={index < 4}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Arrows on sides */}
          {totalImages > cardsPerView && (
            <>
              <button
                onClick={goToPrevious}
                disabled={currentIndex <= 0}
                className="imgCarousel-arrow left"
                aria-label="Précédent"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="15,18 9,12 15,6" />
                </svg>
              </button>
              <button
                onClick={goToNext}
                disabled={currentIndex >= maxIndex}
                className="imgCarousel-arrow right"
                aria-label="Suivant"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="9,18 15,12 9,6" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Bottom nav */}
        {/* <div className="imgCarousel-bottom">
          <div className="imgCarousel-info">
            <Link
              href="/collection"
              className="px-4 py-2 bg-[#1a1a1a] text-[#f1f0e7] rounded-lg hover:bg-[#1a1a1a]/90 transition"
            >
              Notre collection
            </Link>
          </div>
        </div> */}
      </div>
    </section>
  )
}
