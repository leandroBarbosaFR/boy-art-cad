import React from 'react'
import Image from 'next/image'
import {PortableText} from '@portabletext/react'
import ContactForm from '../components/ContactForm'
import {client} from '../../sanity/client'
import {urlFor} from '../../lib/sanityImage'
import '../styles/contactPage.css'
import CrabSvg from '../components/CrabSvg'

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
        <CrabSvg />
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
