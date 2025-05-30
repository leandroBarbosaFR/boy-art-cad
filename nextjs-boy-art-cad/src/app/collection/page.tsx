import {groq} from 'next-sanity'
import {client} from '../../sanity/client'
import Link from 'next/link'
import Image from 'next/image'
import '../styles/collectionsIndex.css'

const query = groq`*[_type == "collection"]{
  _id,
  title,
  slug,
  subtitle,
  "mainImageUrl": mainImage.asset->url
}`

const settingsQuery = groq`
  *[_type == "siteSettings"][0]{
    collectionsPageTitle
  }
`

interface Collection {
  _id: string
  title: string
  slug: {current: string}
  subtitle?: string
  mainImageUrl?: string
}

export default async function CollectionIndexPage() {
  const [collections, settings] = await Promise.all([
    client.fetch(query),
    client.fetch(settingsQuery),
  ])

  return (
    <section className="collections-index-page">
      <div className="collections-index-container">
        <h1 className="text-3xl font-bold mb-6 ">
          {settings?.collectionsPageTitle || 'Toutes les collections'}
        </h1>
        <div className="collections-index-grid">
          <div className="collections-items-grid">
            {collections.map((item: Collection) => (
              <Link
                href={`/collection/${item.slug.current}`}
                key={item._id}
                className="collections-item-grid"
              >
                <div className="rounded transition">
                  {item.mainImageUrl && (
                    <Image
                      src={item.mainImageUrl}
                      alt={item.title}
                      width={800}
                      height={500}
                      className="object-cover image-wrap w-full rounded"
                    />
                  )}
                  <h2 className="text-xl font-semibold mt-4">{item.title}</h2>
                  <p className="text-sm text-gray-600">{item.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
