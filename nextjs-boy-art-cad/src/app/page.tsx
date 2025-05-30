import Layout from '../app/components/Layout'
import {client} from '../sanity/client'
// import ThemeToggle from './components/ThemeToggle'

import './globals.css'

export default async function HomePage() {
  const data = await client.fetch(`*[_type == "landingPage"][0]{
  _id,
  _createdAt,
  _updatedAt,
  _rev,
  _type,
  title,
  subtitle,
  layout[]{
    _key,
    _type,
    title,
    subtitle,
    body,
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
          metadata,
          alt
        },
        alt
      },
    },
    images[]{
      _key,
      _type,
      asset->{
        _id,
        url,
        metadata
      },
      alt
    },
    cta {
      label,
      url
    },
    image {
      asset->{
        _id,
        url,
        metadata
      },
      alt
    },
  },
}`)

  const layout = data?.layout || []
  return (
    <main>
      {/* <ThemeToggle /> */}
      <Layout blocks={layout} />
    </main>
  )
}
