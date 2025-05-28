import type {PortableTextBlock} from '@portabletext/types'

import TextImageSection from '../components/TextImageSection'
import HeroSection from '../components/HeroSection'
import ImageSection from '../components/ImageSection'
import CollectionSection from '../components/CollectionSection'

type Block = {
  _key: string
  _type: string
  title?: string
  subtitle?: string
  body?: PortableTextBlock[]
  cta?: {
    label?: string
    url?: string
  }
  image?: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  images?: {
    _key: string
    alt?: string
    asset: {
      _id: string
      url: string
    }
  }[]
  imagesCollection?: {
    _key: string
    _type: string
    dimensions: string
    image: {
      _type: string
      alt?: string
      asset: {
        _ref: string
        _type: string
      }
    }
    price?: number
    title?: string
  }[]
}

console.log()
export default function Layout({blocks}: {blocks: Block[]}) {
  return (
    <>
      {blocks.map((block) => {
        switch (block._type) {
          case 'textImageSection':
            return <TextImageSection key={block._key} data={block} />
          case 'collectionSection':
            console.log('collectionSection block:', block)
            return (
              <CollectionSection
                key={block._key}
                data={{title: block.title, body: block.body, images: block.imagesCollection || []}}
              />
            )
          case 'imageSection':
            return (
              <ImageSection
                key={block._key}
                data={{title: block.title, images: block.images || []}}
              />
            )
          case 'heroSection':
            return (
              <HeroSection
                key={block._key}
                data={{
                  title: block.title,
                  subtitle: block.subtitle,
                  body: block.body,
                  image: block.image,
                  cta: block.cta,
                }}
              />
            )
          default:
            return null
        }
      })}
    </>
  )
}
