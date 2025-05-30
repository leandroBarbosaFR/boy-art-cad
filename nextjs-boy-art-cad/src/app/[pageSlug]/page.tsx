// import {PortableText} from '@portabletext/react'
import {client} from '@/sanity/client'
import {notFound} from 'next/navigation'
import PortableTextRenderer from '../components/PortableTextRenderer'
import type {PortableTextBlock} from '@portabletext/types'
import '../styles/legalPages.css'
import CrabSvg from '../components/CrabSvg'

interface PageData {
  title: string
  body: PortableTextBlock[]
}

export async function generateStaticParams() {
  const slugs = await client.fetch(`*[_type == "pages"]{ "slug": slug.current }`)
  return slugs.map((page: {slug: string}) => ({slug: page.slug}))
}

export default async function Page({params}: {params: Promise<{pageSlug: string}>}) {
  const {pageSlug} = await params
  const page: PageData | null = await client.fetch(
    `*[_type == "pages" && slug.current == $slug][0]`,
    {slug: pageSlug},
  )

  if (!page) {
    notFound()
  }

  return (
    <section className="legal-pages-section">
      <div className="legal-pages-grid">
        <div className="pageSection-bg-section">
          <CrabSvg />
        </div>
        <div className="page-title-wrapper-legal">
          <h1 className="text-3xl font-bold mb-4 ">{page.title}</h1>
        </div>
        <div className="page-body-wrapper-legal">
          <PortableTextRenderer value={page.body} />
        </div>
      </div>
    </section>
  )
}
