import {groq} from 'next-sanity'
import {client} from '../../../sanity/client'
import Image from 'next/image'
import {PortableText} from '@portabletext/react'
import '../../styles/collectionsShow.css'
import Link from 'next/link'
import {ArrowLeft} from 'lucide-react'

const query = groq`
*[_type == "collection" && slug.current == $slug][0]{
  title,
  subtitle,
  description,
  "mainImageUrl": mainImage.asset->url,
  mainImage {
    alt
  },
  images[] {
    _key,
    alt,
    image {
      alt,
      title,
      "url": asset->url
    }
  }
}
`
interface CollectionImage {
  _key: string
  url: string
  alt?: string
  image: {
    url: string | null
    alt?: string | null
    title?: string | null
  }
}

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
            <div className="backBtn-wrapper bg-[#353229] p-2 rounded text-[#f1f0e7] flex gap-2 cursor-pointer">
              {' '}
              <ArrowLeft color="#f1f0e7" size={24} />
              Retour
            </div>
          </Link>
          <p className="text-lg text-gray-600 show-subtitle">{data.subtitle}</p>
          <h1 className="text-3xl font-bold show-title">{data.title}</h1>
          <div className="image-show-collections-wrapper">
            {data.mainImageUrl && (
              <Image
                src={data.mainImageUrl}
                alt={data.mainImage?.alt || ''}
                width={800}
                height={500}
                className="rounded mb-6"
              />
            )}
          </div>

          <div className="prose max-w-none mb-8 show-description">
            <PortableText value={data.description} />
          </div>

          {data.images?.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold mb-4 title-images-bottom">
                Images de la collection
              </h2>
              <div className="image-bottom-wrapper">
                {data.images.map((img: CollectionImage) => (
                  <Image
                    key={img._key}
                    src={img.image.url || ''}
                    alt={img.image.alt || img.alt || ''}
                    width={500}
                    height={400}
                    className="object-cover rounded images-bottom-item"
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
