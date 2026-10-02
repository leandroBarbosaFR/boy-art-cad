export const PRODUCT_PAGE_QUERY = `*[_type == "productPage" && slug.current == $slug][0]{
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
