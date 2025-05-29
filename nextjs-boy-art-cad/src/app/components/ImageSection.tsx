import React from 'react'
import Image from 'next/image'
import {urlFor} from '../../lib/sanityImage'
import '../styles/imageSection.css'
import CrabSvg from '../components/CrabSvg'

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
        <CrabSvg />
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
