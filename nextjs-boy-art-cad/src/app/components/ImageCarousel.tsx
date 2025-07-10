'use client'

import {useKeenSlider} from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import Image from 'next/image'
import {PortableText} from '@portabletext/react'
import type {PortableTextBlock} from '@portabletext/types'
import {useState} from 'react'
import {ChevronLeft, ChevronRight} from 'lucide-react'
import '../styles/imageCarousel.css'

interface Props {
  images: {
    _key: string
    alt?: string
    image: {
      url: string
      alt?: string
      title?: string
      body?: PortableTextBlock[]
    }
  }[]
}

export default function ImageCarousel({images}: Props) {
  // const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    initial: 0,
    // slideChanged: (slider) => {
    //   // setCurrentSlide(slider.track.details.rel)
    // },
    created: () => {
      setLoaded(true)
    },
    slides: {
      perView: 1,
      spacing: 16,
    },
    breakpoints: {
      '(min-width: 740px)': {
        slides: {
          perView: 2,
          spacing: 20,
        },
      },
      '(min-width: 1020px)': {
        slides: {
          perView: 4,
          spacing: 24,
        },
      },
    },
  })

  return (
    <div className="image-carousel-slider">
      {/* Arrows */}
      {loaded && instanceRef.current && (
        <>
          <button
            onClick={() => instanceRef.current?.prev()}
            className=" absolute left-0 top-1/2 z-10 -translate-y-1/2 dark:bg-black/50 hover:bg-black/70 p-2 cursor-pointer rounded-full shadow"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 text-black dark:text-white" />
          </button>
          <button
            onClick={() => instanceRef.current?.next()}
            className=" absolute right-0 top-1/2 z-10 -translate-y-1/2 dark:bg-black/50 hover:bg-black/70 p-2 rounded-full shadow"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 text-black dark:text-white" />
          </button>
        </>
      )}

      <div ref={sliderRef} className="keen-slider">
        {images.map((img) => (
          <div key={img._key} className="keen-slider__slide px-4 flex flex-col">
            <Image
              src={img.image.url}
              alt={img.image.alt || img.alt || 'Image de la collection'}
              width={500}
              height={400}
              className="object-cover rounded w-full"
            />
            {img.image.title && (
              <h1 className="text-left mt-2 text-sm text-gray-800 font-bold">{img.image.title}</h1>
            )}
            {img.image.body && (
              <div className="text-left mt-2 text-sm text-gray-700">
                <PortableText value={img.image.body} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
