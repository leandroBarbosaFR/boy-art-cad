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
    ...,
    _key,
    _type,
    cta {
      label,
      url
    },
    image{
      asset->{
        _id,
        url
      },
      alt
    }
  },
  images[]{
    _key,
    _type,
    title,
    images[]{
      _key,
      _type,
      asset->{
        _id,
        url
      },
      alt
    }
  }
}`)

  console.log('data', data)
  const layout = data?.layout || []

  return (
    <main>
      {/* <ThemeToggle /> */}
      <Layout blocks={layout} />
    </main>
  )
}
