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
  excerpt?: string
  image: SanityImage
}

export interface ProductPageData {
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

export type ProductType = 'bornes' | 'cassettes' | 'tableaux'