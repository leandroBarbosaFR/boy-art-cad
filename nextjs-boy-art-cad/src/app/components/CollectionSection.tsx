import React from 'react'
import Image from 'next/image'
import {urlFor} from '../../lib/sanityImage'
import '../styles/collectionSection.css'
import {PortableText} from '@portabletext/react'
import type {PortableTextBlock} from '@portabletext/types'

interface CollectionSectionProps {
  data: {
    title?: string
    body?: PortableTextBlock[]
    images: {
      _key: string
      _type: string
      dimensions: string
      image: {
        _type: string
        alt?: string
        asset: {
          _ref: string
          _type: string
        }
      }
      price?: number
      title?: string
    }[]
  }
}

export default function CollectionSection({data}: CollectionSectionProps) {
  const heading = data.title || ''
  const body = data.body || []
  const validImages = data.images?.filter((img) => img.image?.asset?._ref) || []

  return (
    <section className="collectionSection-wrapper">
      {/* <div className="collectionSection-bg-section"></div> */}
      <div className="collectionSection-container">
        <div className="grid-text-section-collection">
          <div className="heading-wrapper-collection">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[36px] text-[#fff]">
              {heading}
            </h1>
          </div>
          <div className="hero-body-collection">
            <PortableText value={body} />
          </div>
          <div className="image-wrapper-collection">
            {validImages.map((img) => (
              <div key={img._key} className="image-grid-item-collection">
                <Image
                  key={img._key}
                  width={2271}
                  height={1500}
                  src={urlFor(img.image).width(2271).height(1500).url()}
                  alt={img.image.alt || 'Section image'}
                  quality={100}
                  className="image-grid-item-collection"
                />
                <h1 className="font-bold">{img.title}</h1>
                <h3>{img.price} €</h3>
                <p className="image-dimensions">{img.dimensions}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
