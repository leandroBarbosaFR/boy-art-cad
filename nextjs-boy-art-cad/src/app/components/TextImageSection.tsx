import Image from 'next/image'
import { urlFor } from '@/lib/sanityImage'

interface TextImageSectionProps {
  heading: string
  text: string
  image?: {
    asset?: {
      _ref: string
    }
    alt?: string
  }
  imagePosition: 'left' | 'right'
}

export default function TextImageSection({
  heading,
  text,
  image,
  imagePosition = 'right'
}: TextImageSectionProps) {
  const imageUrl = image?.asset ? urlFor(image).width(600).height(400).url() : null

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className={`grid md:grid-cols-2 gap-8 items-center ${
        imagePosition === 'left' ? 'md:grid-flow-col-dense' : ''
      }`}>
        <div className={`space-y-6 ${
          imagePosition === 'left' ? 'md:col-start-2' : ''
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            {heading}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {text}
          </p>
        </div>

        <div className={`relative ${
          imagePosition === 'left' ? 'md:col-start-1 md:row-start-1' : ''
        }`}>
          <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-lg">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={image?.alt || heading}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="bg-gray-200 w-full h-96 flex items-center justify-center rounded-lg">
                <p className="text-gray-500">Image placeholder</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
