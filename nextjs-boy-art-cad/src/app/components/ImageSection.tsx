import React from 'react'
import Image from 'next/image'
import {urlFor} from '../../lib/sanityImage'
import '../styles/imageSection.css'

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
  const heading = data.title || ''
  const validImages = data.images?.filter((img) => img.asset?._ref || img.asset?._id) || []

  return (
    <section className="imgSection-wrapper">
      <div className="imageSection-bg-section-px">
        <svg
          version="1.1"
          id="Icons"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 32 32"
          xmlSpace="preserve"
        >
          <path
            d="M31,16h-2v-2c0-0.6-0.4-1-1-1h-2v-2c0-0.6-0.4-1-1-1h-2V8h2c0.6,0,1-0.4,1-1V4c0-0.6-0.4-1-1-1h-3c-0.6,0-1,0.4-1,1v2h-2
            c-0.6,0-1,0.4-1,1v3h-4V7c0-0.6-0.4-1-1-1h-2V4c0-0.6-0.4-1-1-1H7C6.4,3,6,3.4,6,4v3c0,0.6,0.4,1,1,1h2v2H7c-0.6,0-1,0.4-1,1v2H4
            c-0.6,0-1,0.4-1,1v2H1c-0.6,0-1,0.4-1,1v9c0,0.6,0.4,1,1,1h3c0.6,0,1-0.4,1-1v-5h1v5c0,0.6,0.4,1,1,1h2v2c0,0.6,0.4,1,1,1h4
            c0.6,0,1-0.4,1-1v-3c0-0.6-0.4-1-1-1h-3v-1h10v1h-3c-0.6,0-1,0.4-1,1v3c0,0.6,0.4,1,1,1h4c0.6,0,1-0.4,1-1v-2h2c0.6,0,1-0.4,1-1v-5
            h1v5c0,0.6,0.4,1,1,1h3c0.6,0,1-0.4,1-1v-9C32,16.4,31.6,16,31,16z M14,19c0,0.6-0.4,1-1,1h-3c-0.6,0-1-0.4-1-1v-3c0-0.6,0.4-1,1-1
            h3c0.6,0,1,0.4,1,1V19z M23,19c0,0.6-0.4,1-1,1h-3c-0.6,0-1-0.4-1-1v-3c0-0.6,0.4-1,1-1h3c0.6,0,1,0.4,1,1V19z"
            fill="#dededc"
            fillOpacity="0.8"
          />
        </svg>
      </div>
      <div className="imgSection-container">
        <div className="grid-text-section-image">
          <div className="heading-wrapper-image">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[36px]">
              {heading}
            </h1>
          </div>
          <div className="image-wrapper-images">
            {validImages.map((img) => (
              <Image
                key={img._key}
                width={2271}
                height={1500}
                src={urlFor(img).width(2271).height(1500).url()}
                alt={img.alt || 'Section image'}
                quality={100}
                className="image-grid-item"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
