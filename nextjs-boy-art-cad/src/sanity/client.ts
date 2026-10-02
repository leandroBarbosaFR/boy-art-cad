import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: '5vf6pjp6',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

// Query GROQ pour récupérer une page produit par slug
const PRODUCT_PAGE_QUERY = `*[_type == "productPage" && slug.current == $slug][0]{
  productType,
  "slug": slug.current,
  title,
  subtitle,
  description,
  mainImage{
    asset->{
      _id,
      url
    },
    alt
  },
  gallery[]{
    title,
    "slug": slug.current,
    excerpt,
    image{
      asset->{
        _id,
        url
      },
      alt
    }
  },
  seo
}`

// Query GROQ pour récupérer un élément de la galerie d'une page produit
const PRODUCT_ITEM_QUERY = `*[_type == "productPage" && slug.current == $slug][0]{
  productType,
  title,
  "slug": slug.current,
  "item": gallery[slug.current == $itemSlug][0]{
    title,
    excerpt,
    description,
    image{
      asset->{
        _id,
        url
      },
      alt
    },
    images[]{
      asset->{
        _id,
        url
      },
      alt
    }
  }
}`

// Fonction pour récupérer une page produit par slug
export async function getProductPageBySlug(slug: string) {
  return await client.fetch(PRODUCT_PAGE_QUERY, { slug })
}

// Fonction pour récupérer un élément de la galerie par slug
export async function getProductItemBySlug(slug: string, itemSlug: string) {
  return await client.fetch(PRODUCT_ITEM_QUERY, { slug, itemSlug })
}