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
            <h1 className="collection-main-title">{title}</h1>
          </div>

          <div className="hero-body-collection">{body && <PortableText value={body} />}</div>

          {collections.length > 0 && (
            <div className="collection-items">
              {collections.map((collection) => {
                if (!collection.mainImage?.asset?.url) return null

                return (
                  <Link
                    key={collection._id}
                    href={`/${collection.slug.current}`}
                    className="grid-item"
                  >
                    <div className="image-collection-container">
                      <Image
                        src={collection.mainImage.asset.url}
                        alt={collection.mainImage.alt || collection.title}
                        fill
                        quality={90}
                        className="image-collection"
                        priority={collections.indexOf(collection) < 3}
                      />
                    </div>

                    <h2 className="collection-item-title">{collection.title}</h2>
                    <p className="collection-dimensions">Dimensions: {collection.dimensions}</p>
                    {collection.price && (
                      <p className="collection-price">Prix: {collection.price} €</p>
                    )}
                  </Link>
                )
              })}
            </div>
          )}

          {/* CTA Button */}
          <div className="cta-button-wrapper">
            <Link href="/collection" className="btn-wrapper-collection">
              Voir toutes les collections
              <ArrowRight color="#f1f0e7" size={20} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
