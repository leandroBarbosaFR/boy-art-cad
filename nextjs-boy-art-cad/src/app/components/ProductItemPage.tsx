import { PortableText } from '@portabletext/react'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { ProductItemData } from '../../lib/types/sanity'

interface ProductItemPageProps {
  data: ProductItemData
}

export default function ProductItemPage({data}: ProductItemPageProps) {
  const item = data.item
  if (!item) return null

  return (
    <section className="relative mx-auto max-w-6xl px-4 py-10">
      {/* Back link */}
      <div className="mb-6">
        <Link
          href={`/${data.slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-700 hover:text-neutral-900"
        >
          <ArrowLeft className="h-4 w-4" /> Retour
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Main image */}
        <div className="overflow-hidden rounded-2xl shadow-lg">
          {item.image?.asset ? (
            <Image
              src={item.image.asset.url}
              alt={item.image.alt || item.title}
              width={1200}
              height={800}
              className="h-[420px] w-full object-cover"
              priority
            />
          ) : (
            <div className="h-[420px] w-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Image non disponible</span>
            </div>
          )}
        </div>

        {/* Text content */}
        <div>
          <p className="text-xs uppercase tracking-widest text-neutral-500">
            {data.productType || data.title}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">{item.title}</h1>

          {item.excerpt && <p className="mt-4 text-neutral-700 leading-relaxed">{item.excerpt}</p>}

          {item.description && (
            <div className="mt-4 text-neutral-700 leading-relaxed">
              <PortableText
                value={item.description}
                components={{
                  block: {
                    normal: ({children}) => <p className="mb-4 last:mb-0">{children}</p>,
                  },
                }}
              />
            </div>
          )}

          {/* CTA */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:bg-neutral-900 transition-colors"
            >
              Prendre contact
            </Link>
          </div>
        </div>
      </div>

      {/* Extra images */}
      {item.images && item.images.length > 0 && (
        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {item.images.map(
            (image, i) =>
              image.asset && (
                <div key={i} className="overflow-hidden rounded-xl">
                  <Image
                    src={image.asset.url}
                    alt={image.alt || item.title}
                    width={600}
                    height={400}
                    className="h-[330px] w-full object-cover"
                  />
                </div>
              ),
          )}
        </div>
      )}
    </section>
  )
}
