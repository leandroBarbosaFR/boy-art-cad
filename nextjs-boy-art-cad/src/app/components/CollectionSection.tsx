// import React from 'react'
// import Image from 'next/image'
// import Link from 'next/link'
// import '../styles/collectionSection.css'
// import {PortableText} from '@portabletext/react'
// import type {PortableTextBlock} from '@portabletext/types'
// import {ArrowRight} from 'lucide-react'

// interface CollectionSectionProps {
//   data: {
//     _key: string
//     _type: string
//     title?: string
//     body?: PortableTextBlock[]
//     collections?: {
//       _id: string
//       _type: string
//       title: string
//       slug: {
//         _type: string
//         current: string
//       }
//       dimensions: string
//       price?: number
//       mainImage?: {
//         asset: {
//           _id: string
//           url: string
//         }
//         alt?: string
//       }
//     }[]
//   }
// }

// export default function CollectionSection({data}: CollectionSectionProps) {
//   const {title, body, collections = []} = data

//   return (
//     <section className="collectionSection-wrapper">
//       <div className="collectionSection-container">
//         <div className="grid-text-section-collection">
//           <div className="heading-wrapper-collection">
//             <h1 className="collection-main-title">{title}</h1>
//           </div>

//           <div className="hero-body-collection">{body && <PortableText value={body} />}</div>

//           {collections.length > 0 && (
//             <div className="collection-items">
//               {collections.map((collection) => {
//                 if (!collection.mainImage?.asset?.url) return null

//                 return (
//                   <Link
//                     key={collection._id}
//                     href={`/collection/${collection.slug.current}`}
//                     className="grid-item"
//                   >
//                     <div className="image-collection-container">
//                       <Image
//                         src={collection.mainImage.asset.url}
//                         alt={collection.mainImage.alt || collection.title}
//                         fill
//                         quality={90}
//                         className="image-collection"
//                         priority={collections.indexOf(collection) < 3}
//                       />
//                     </div>

//                     <h2 className="collection-item-title">{collection.title}</h2>
//                     <p className="collection-dimensions">Dimensions: {collection.dimensions}</p>
//                     {collection.price && (
//                       <p className="collection-price">Prix: {collection.price} €</p>
//                     )}
//                   </Link>
//                 )
//               })}
//             </div>
//           )}

//           {/* CTA Button */}
//           <div className="cta-button-wrapper">
//             <Link href="/collection" className="btn-wrapper-collection">
//               Voir toutes les collections
//               <ArrowRight color="#f1f0e7" size={20} />
//             </Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'

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

export default function CollectionSection({ data }: CollectionSectionProps) {
  const { title, body, collections = [] } = data

  return (
    <section className="relative mx-6 my-0 overflow-hidden rounded-[10px] py-24 px-6 sm:mx-5 sm:py-20 sm:px-5 md:mx-5 md:py-24 md:px-8 lg:mx-8 lg:py-28 lg:px-10 xl:mx-10 xl:py-32 xl:px-12 xl:rounded-[15px]">
      <div className="w-full">
        {/* Grid Container */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-5 sm:gap-x-6 md:gap-x-6">
          
          {/* Header Section */}
          <div className="col-span-12 justify-self-center text-[#1a1a1a]">
            <h2 className="text-3xl font-bold leading-[1.2] text-[#1a1a1a] m-0 text-center sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl">
              {title}
            </h2>
          </div>

          {/* Body Section */}
          {body && (
            <div className="col-span-12 justify-self-center text-center text-[#1a1a1a] max-w-[600px] text-base leading-[1.6] sm:max-w-[700px] md:max-w-[800px] lg:max-w-[900px] lg:text-lg xl:max-w-[1000px] xl:text-xl">
              <PortableText 
                value={body}
                components={{
                  block: {
                    normal: ({ children }) => (
                      <p className="m-0 mb-4 last:mb-0">
                        {children}
                      </p>
                    ),
                  },
                }}
              />
            </div>
          )}

          {/* Collections Grid */}
          {collections.length > 0 && (
            <div className="col-span-12 grid grid-cols-12 gap-x-6 gap-y-6 text-[#1a1a1a]">
              {collections.map((collection) => {
                if (!collection.mainImage?.asset?.url) return null

                return (
                  <Link
                    key={collection._id}
                    href={`/collection/${collection.slug.current}`}
                    className="col-span-12 block text-[#1a1a1a] no-underline group md:col-span-4"
                  >
                    {/* Image Container */}
                    <div className="overflow-hidden rounded-[10px] border border-transparent transition-all duration-300 aspect-[4/3] relative bg-transparent group-hover:border-transparent group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)]">
                      <Image
                        src={collection.mainImage.asset.url}
                        alt={collection.mainImage.alt || collection.title}
                        fill
                        quality={90}
                        className="w-full h-full object-fill transition-transform duration-300 origin-center group-hover:scale-105"
                        priority={collections.indexOf(collection) < 3}
                      />
                    </div>

                    {/* Content */}
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold mt-4 mb-2 text-[#1a1a1a] lg:text-xl xl:text-[1.375rem]">
                        {collection.title}
                      </h3>
                      
                      <p className="text-sm text-[#1a1a1a] m-0 mb-1 font-semibold">
                        Dimensions: {collection.dimensions}
                      </p>
                      
                      {collection.price && (
                        <p className="text-base font-semibold text-[#1a1a1a] m-0">
                          Prix: {collection.price} €
                        </p>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          )}

        </div>
      </div>
    </section>
  )
}