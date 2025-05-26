import Layout from '../app/components/Layout'
import {client} from '../sanity/client'

export default async function HomePage() {
  const data = await client.fetch(`*[_type == "landingPage"][0]{
  _id,
  _createdAt,
  _updatedAt,
  _rev,
  _type,
  title,
  layout[]{
    _key,
    _type,
    title
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
