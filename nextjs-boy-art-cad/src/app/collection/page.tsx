import {groq} from 'next-sanity'
import {client} from '../../sanity/client'
import Link from 'next/link'
import Image from 'next/image'
import CategoryFilter from '../components/CategoryFilter'
import '../styles/collectionsIndex.css'

export const dynamic = 'force-dynamic'

interface Collection {
  _id: string
  title: string
  slug: {current: string}
  subtitle?: string
  mainImageUrl?: string
  category?: {
    title: string
    slug: {current: string}
  }
}

interface Category {
  _id: string
  title: string
  slug: {current: string}
}

type PageProps = {
  searchParams?: Promise<Record<string, string | string[]>>
}

export default async function CollectionIndexPage({searchParams}: PageProps) {
  const resolvedSearchParams = await searchParams
  const raw = resolvedSearchParams?.category
  const categorySlug = Array.isArray(raw) ? raw[0] : raw || null

  const query = categorySlug
    ? groq`*[_type == "collection" && defined(slug.current) && category->slug.current == $categorySlug]{
        _id,
        title,
        slug,
        subtitle,
        "mainImageUrl": mainImage.asset->url,
        category->{ title, slug }
      }`
    : groq`*[_type == "collection" && defined(slug.current)]{
        _id,
        title,
        slug,
        subtitle,
        "mainImageUrl": mainImage.asset->url,
        category->{ title, slug }
      }`

  const categoriesQuery = groq`
    *[_type == "category"]{
      _id,
      title,
      slug
    }
  `

  const settingsQuery = groq`
    *[_type == "siteSettings"][0]{
      collectionsPageTitle
    }
  `

  const [collections, categories, settings] = await Promise.all([
    client.fetch(query, {categorySlug}),
    client.fetch(categoriesQuery),
    client.fetch(settingsQuery),
  ])

  // Pour debug en dev si des slugs sont manquants
  collections.forEach((item: Collection) => {
    if (!item.slug?.current) {
      console.warn('❌ Collection sans slug:', item._id, item.title)
    }
  })

  const currentCategory = categorySlug
    ? categories.find((cat: Category) => cat.slug.current === categorySlug)
    : null

  return (
    <section className="collections-index-page">
      <div className="collections-index-container">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h1 className="text-3xl font-bold">
            {currentCategory
              ? currentCategory.title
              : settings?.collectionsPageTitle || 'Toutes les collections'}
          </h1>
          <CategoryFilter categories={categories} currentCategory={categorySlug} />
        </div>

        <div className="collections-index-grid">
          <div className="collections-items-grid">
            {collections.length > 0 ? (
              collections
                .filter((item: Collection) => item.slug?.current)
                .map((item: Collection) => (
                  <Link
                    href={`/collection/${item.slug.current}`}
                    key={item._id}
                    className="collections-item-grid"
                  >
                    <div className="rounded transition">
                      {item.mainImageUrl ? (
                        <Image
                          src={item.mainImageUrl}
                          alt={item.title}
                          width={800}
                          height={500}
                          className="object-cover image-wrap w-full rounded"
                        />
                      ) : (
                        <div className="bg-gray-100 w-full h-[300px] rounded flex items-center justify-center text-gray-400 text-sm">
                          Aucune image
                        </div>
                      )}
                      <h2 className="text-xl font-semibold mt-4">{item.title}</h2>
                      <p className="text-sm text-gray-600">{item.subtitle}</p>
                      <p className="text-xs text-gray-500">{item.category?.title}</p>
                    </div>
                  </Link>
                ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">
                  {currentCategory
                    ? `Aucune collection trouvée dans la catégorie "${currentCategory.title}"`
                    : 'Aucune collection trouvée'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
