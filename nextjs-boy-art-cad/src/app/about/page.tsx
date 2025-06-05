'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { PortableTextBlock } from '@portabletext/types'
import { client } from '../../sanity/client'
import { urlFor } from '../../lib/sanityImage'
import '../styles/aboutPage.css'
import PortableTextRenderer from '../components/PortableTextRenderer'
import CrabSvg from '../components/CrabSvg'

gsap.registerPlugin(ScrollTrigger)

const query = `*[_type == "about"][0] {
  title,
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
      internal->{ title, slug },
      externalUrl,
      title
    },
    title
  },
  image { asset }
}`

interface AboutData {
  title?: string
  body?: PortableTextBlock[]
  cta?: {
    title?: string
    link?: {
      internal?: {
        title?: string
        slug?: {
          current: string
        }
      }
      externalUrl?: string
      title?: string
    }
  }
  image?: {
    asset?: {
      _ref?: string
      _id?: string
    }
  }
}

export default function AboutPage() {
const [data, setData] = useState<AboutData | null>(null)

  const imageRef = useRef(null)
  const titleRef = useRef(null)
  const bodyRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    client.fetch(query).then((res) => setData(res))
  }, [])

  useEffect(() => {
    if (!data) return

    gsap.from(imageRef.current, {
      x: -50,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: imageRef.current,
        start: 'top 90%',
      },
    })

    gsap.from(titleRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: titleRef.current,
        start: 'top 90%',
      },
    })

    gsap.from(bodyRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.8,
      delay: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: bodyRef.current,
        start: 'top 90%',
      },
    })

    gsap.from(ctaRef.current, {
      scale: 0.95,
      opacity: 0,
      duration: 0.6,
      delay: 0.3,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: ctaRef.current,
        start: 'top 95%',
      },
    })
  }, [data])

  if (!data) return null

  return (
    <section className="about-page relative">
      <div className="aboutSection-bg-section">
        <CrabSvg />
      </div>
      <div className="about-page-grid">
        <div className="image-wrapper" ref={imageRef}>
          {data.image?.asset && (
            <Image
              src={urlFor(data.image.asset).width(7172).url()}
             alt={data.title || 'Image'}
              quality={100}
              priority
              width={800}
              height={400}
              style={{ objectFit: 'cover' }}
            />
          )}
        </div>
        <div className="title-about" ref={titleRef}>
          <h1 className="text-4xl font-bold">{data.title}</h1>
        </div>
        <div className="text-[#1a1a1a] body-about" ref={bodyRef}>
          <PortableTextRenderer value={data.body || []} />
        </div>
        {data.cta && (
          <div className="cta-section" ref={ctaRef}>
            {data.cta.title && (
              <h2 className="text-xl font-bold mb-2 about-cta-title">
                {data.cta.title}
              </h2>
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
