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
  console.log('cta', cta)
  return (
    <section className="textImgSection-wrapper">
      <div className="textImageSection-bg-section"></div>
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
                width={7172}
                height={7172}
                src={urlFor(data.image).width(7172).url()}
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
