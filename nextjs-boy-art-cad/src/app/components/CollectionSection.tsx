import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import '../styles/collectionSection.css'
import {PortableText} from '@portabletext/react'
import type {PortableTextBlock} from '@portabletext/types'
import {ArrowRight} from 'lucide-react'

interface CollectionSectionProps {
  data: {
    _key: string
    _type: string
    title?: string
    body?: PortableTextBlock[]
    collections?: {
      _id: string
      _type: string
      title: string
      slug: {
        _type: string
        current: string
      }
      dimensions: string
      price?: number
      mainImage?: {
        asset: {
          _id: string
          url: string
        }
        alt?: string
      }
    }[]
  }
}

export default function CollectionSection({data}: CollectionSectionProps) {
  const {title, body, collections = []} = data

  return (
    <section className="collectionSection-wrapper">
      <div className="collectionSection-container">
        <div className="grid-text-section-collection">
          <div className="heading-wrapper-collection">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[36px] text-[#fff]">
              {title}
            </h1>
          </div>
          <div className="hero-body-collection">{body && <PortableText value={body} />}</div>
          {collections.length > 0 && (
            <div className="collection-items">
              {collections.map((collection) => {
                if (!collection.mainImage?.asset?.url) return null

                return (
                  <Link
                    key={collection._id}
                    href={`/collection/${collection.slug.current}`}
                    className="grid-item"
                  >
                    <div className="image-collection-container">
                      <Image
                        src={collection.mainImage.asset.url}
                        alt={collection.mainImage.alt || collection.title}
                        width={3419}
                        height={3564}
                        quality={100}
                        objectFit="cover"
                        className="image-collection"
                      />
                    </div>

                    <h2 className="font-bold">{collection.title}</h2>
                    <p>{collection.dimensions}</p>
                    {collection.price && <p>{collection.price} €</p>}
                  </Link>
                )
              })}
            </div>
          )}
          {/* CTA Button */}
          <div className="mt-6 cta-button-wrapper">
            <Link
              href="/collection"
              className="btn-wrapper-collection inline-block px-6 py-2 bg-white text-black rounded hover:bg-gray-200 transition cursor-pointer"
            >
              Voir toutes les collections
              <ArrowRight color="#1a1a1a" size={24} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
