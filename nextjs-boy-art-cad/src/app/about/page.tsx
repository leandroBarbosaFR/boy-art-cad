import React from 'react'
import Image from 'next/image'
// import {PortableText} from '@portabletext/react'
import { client } from '../../sanity/client'
import { urlFor } from '../../lib/sanityImage'
import Link from 'next/link'
import '../styles/aboutPage.css'
import PortableTextRenderer from '../components/PortableTextRenderer'
import CrabSvg from '../components/CrabSvg'

const query = `*[_type == "about"][0] {
  _createdAt,
  _id,
  _rev,
  _type,
  _updatedAt,
  body[0..9] {
    _key,
    _type,
    children[] {
      _key,
      _type,
      marks,
      text
    },
    markDefs,
    style,
    level,
    listItem
  },
  cta {
    link {
      _type,
      internal->{
      title,
      slug,
    },
    },
    title
  },
  image {
    _type,
    asset
  },
  slug {
    _type,
    current
  },
  title
}`

export default async function AboutPage() {
  const data = await client.fetch(query)

  return (
    <section className="about-page relative">
      <div className="aboutSection-bg-section">
        <CrabSvg />
      </div>
      <div className="about-page-grid">
        <div className='image-wrapper'>
          {data.image?.asset && (
              <Image
                src={urlFor(data.image.asset).width(7172).url()}
                alt={data.title}
                // fill
                quality={100}
                priority
                width={800}
                height={400}
                style={{ objectFit: 'cover' }}
               
              />
          )}
        </div>
        <div className="title-about">
          <h1 className="text-4xl font-bold">{data.title}</h1>
        </div>
        <div className="text-[#1a1a1a] body-about">
          <PortableTextRenderer value={data.body} />
        </div>
        {data.cta && (
          <div className="cta-section">
            {data.cta.title && (
              <h2 className="text-xl font-bold mb-2 about-cta-title">{data.cta.title}</h2>
            )}
            {(data.cta.link?.internal?.slug?.current || data.cta.link?.externalUrl) && (
              <>
                {data.cta.link?.internal?.slug?.current ? (
                  <Link
                    href={`/${data.cta.link.internal.slug.current}`}
                    className="inline-block px-4 py-2 bg-[#f1f0e7] hover:bg-[#f1f0e7]/90 text-[#1a1a1a] rounded cursor-pointer cta-about"
                  >
                    {data.cta.link.internal.title || 'Contactez-nous'}
                  </Link>
                ) : data.cta.link?.externalUrl ? (
                  <a
                    href={data.cta.link.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-[#f1f0e7] hover:bg-[#f1f0e7]/90 text-[#1a1a1a] rounded cta-about cursor-pointer"
                  >
                    {data.cta.link.title || 'Contactez-nous'}
                  </a>
                ) : null}
              </>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
