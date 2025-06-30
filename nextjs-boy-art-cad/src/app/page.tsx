import Layout from '../app/components/Layout'
import {client} from '../sanity/client'
// import ThemeToggle from './components/ThemeToggle'
export const dynamic = 'force-dynamic'

import './globals.css'

export default async function HomePage() {
  const data = await client.fetch(`*[_type == "landingPage"][0]{
  _id,
  title,
  subtitle,
  layout[]{
    _key,
    _type,
    title,
    subtitle,
    body,
    embed,
    cta {
      label,
      urlType,
      internalLink,
      externalUrl
    },
    image {
      asset->{
        _id,
        url,
        metadata
      },
      alt
    },
    images[]{
      _key,
      _type,
      alt,
      caption,
      asset->{
        _id,
        url,
        metadata
      }
    },
    collections[]->{
      _id,
      _type,
      title,
      slug,
      subtitle,
      description,
      price,
      dimensions,
      mainImage{
        asset->{
          _id,
          url,
          metadata
        },
        alt
      }
    }
  }
}`)

  const layout = data?.layout || []
  return (
    <main>
      {/* <ThemeToggle /> */}
      <Layout blocks={layout} />
    </main>
  )
}
