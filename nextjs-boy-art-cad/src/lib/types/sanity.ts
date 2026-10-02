// types/sanity.ts
import type { PortableTextBlock } from '@portabletext/types'

export interface SanityImage {
  asset: {
    _id: string
    url: string
  }
  alt?: string
}

export interface GalleryItem {
  title: string
  slug?: string
  excerpt?: string
  image: SanityImage
}

export interface ProductItemData {
  productType?: string
  title: string
  slug: string
  item?: {
    title: string
    excerpt?: string
    description?: PortableTextBlock[]
    image?: SanityImage
    images?: SanityImage[]
  }
}

export interface ProductPageData {
  productType?: string
  slug?: string
  title: string
  subtitle?: string
  description?: PortableTextBlock[]
  mainImage?: SanityImage
  gallery?: GalleryItem[]
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
}

export interface ProductPageProps {
  data: ProductPageData
}