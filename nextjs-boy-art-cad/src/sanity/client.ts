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

// Fonction pour récupérer une page produit par slug
export async function getProductPageBySlug(slug: string) {
  return await client.fetch(PRODUCT_PAGE_QUERY, { slug })
}