// src/app/collection/[slug]/page.tsx
import {groq} from 'next-sanity'
import {client} from '../../../sanity/client'
import Image from 'next/image'
import {PortableText} from '@portabletext/react'
import '../../styles/collectionsShow.css'
import Link from 'next/link'
import {ArrowLeft} from 'lucide-react'
import ImageCarousel from '@/app/components/ImageCarousel'

export const dynamic = 'force-dynamic'

const query = groq`
  *[_type == "collection" && slug.current == $slug][0]{
    title,
    subtitle,
    description,
    category-> {
      _id,
      title,
      slug
    },
    imagesTitreSection,
    "mainImageUrl": mainImage.asset->url,
    mainImage {
      alt
    },
    images[] {
      _key,
      image {
        alt,
        title,
        body,
        "url": asset->url
      }
    }
  }
`

type Props = {
  params: Promise<{slug: string}>
}

export default async function CollectionShowPage({params}: Props) {
  const resolvedParams = await params
  const data = await client.fetch(query, {slug: resolvedParams.slug})

  if (!data) {
    return <div>Collection non trouvée.</div>
  }

  return (
    <section className="collections-show-section">
      <div className="collections-show-container">
        <div className="collections-show-grid">
          <Link href="/collection">
            <div className="whitespace-nowrap backBtn-wrapper bg-[transparent] text-[#212121] font-bold hover:text-[rgba(0,0,0, 0.8)] flex gap-2 cursor-pointer">
              <ArrowLeft color="#1a1a1a" size={24} />
              Retour aux collections
            </div>
          </Link>

          {/* <p className="text-lg p-2 bg-[#1a1a1a] rounded text-[#f1f0e7] show-subtitle">
            {data.category?.title}
          </p> */}
          <h1 className="text-3xl font-bold show-title">{data.title}</h1>

          {data.mainImageUrl && (
            <div className="image-show-collections-wrapper">
              <Image
                src={data.mainImageUrl}
                alt={data.mainImage?.alt || 'Image principale de la collection'}
                width={800}
                height={500}
                className="rounded"
              />
            </div>
          )}

          <div className="prose max-w-none show-description">
            <PortableText value={data.description} />
          </div>

          {data.images?.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold mb-4 title-images-bottom">
                {data.imagesTitreSection}
              </h2>

              <div className="image-bottom-wrapper">
                {data.images?.length > 0 && (
                  <>
                    <ImageCarousel images={data.images} />
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
