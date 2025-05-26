import Layout from '../app/components/Layout'
import {client} from '../sanity/client'



export default async function HomePage() {
  const data = await client.fetch(`*[_type == "landingPage" && slug.current == "homepage"][0]{
  title,
  layout[]{
    _key,
    _type,
    heading,
    text,
    image{
      asset->{url},
      alt
    },
    imagePosition
  }
}`)
console.log(data)
  const layout = data?.layout || []
  console.log(layout)

  return (
    <main>
      <Layout blocks={layout} />
    </main>
  )
}

