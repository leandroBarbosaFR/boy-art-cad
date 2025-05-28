// app/contact/[slug]/page.tsx  (or wherever your route with slug param is)
import React from 'react'
import Image from 'next/image'
import {PortableText} from '@portabletext/react'
import ContactForm from '../components/ContactForm'
import {client} from '../../sanity/client'
import {urlFor} from '../../lib/sanityImage'
import '../styles/contactPage.css'

const query = `*[_type == "contact" && slug.current == $slug][0] {
  title,
  subtitle,
  body,
  slug,
  image {
      asset->{
        _id,
        url
      },
      alt
  },
  layout[] {
    ...
  }
}`

export default async function ContactPage() {
  const slug = 'contact'
  const data = await client.fetch(query, {slug})
  const image = data.image?.asset?.url
  if (!data) {
    return <div>Page not found</div>
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f1f0e7]" style={{position: 'relative'}}>
      <div className="contactSection-bg-section">
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
      {/* Image on top */}
      <div className="relative w-full h-[400px]">
        {image && (
          <Image
            src={urlFor(data.image).width(7172).url()}
            alt="Hero image"
            fill
            style={{objectFit: 'cover'}}
            quality={100}
            priority
            className="rounded-b-lg"
          />
        )}
      </div>

      {/* Grid container */}
      <div className="gap-5 px-5 mt-10 contact-page-container">
        {/* Title */}
        <h1 className=" font-bold text-4xl text-[#1a1a1a] title-contact">{data.title}</h1>

        {/* Subtitle */}
        <h2 className="text-xl font-bold text-[#1a1a1a] subtitle-contact">{data.subtitle}</h2>

        {/* Body */}
        <div className="text-[#1a1a1a] body-contact">
          <PortableText value={data.body} />
        </div>

        {/* Form */}
        <div className="mt-6 form-contact">
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
