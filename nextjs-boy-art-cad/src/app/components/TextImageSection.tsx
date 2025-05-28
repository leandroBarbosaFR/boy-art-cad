import React from 'react'
import {PortableText} from '@portabletext/react'
import type {PortableTextBlock} from '@portabletext/types'
import Image from 'next/image'
import {urlFor} from '../../lib/sanityImage'
import '../styles/textImageSection.css'

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
  const heading = data.title || ''
  const subtitle = data.subtitle || ''
  const body = data.body || []
  const image = data.image?.asset?.url
  const cta = data.cta

  return (
    <section className="textImgSection-wrapper">
      <div className="textImageSection-bg-section">
        {/* <svg
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
        </svg> */}
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
          <div className="body-wrapper">
            <PortableText value={body} />
          </div>
          <div className="cta-wrapper">
            {' '}
            {cta?.label && (
              <a href={cta.url} target="_blank" rel="noopener noreferrer">
                <button className="bg-[#1a1a1a] text-white px-6 py-2 rounded hover:bg-[#1a1a1a]/90 transition-all cursor-pointer">
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
