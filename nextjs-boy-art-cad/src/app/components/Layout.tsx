import TextImageSection from '../components/TextImageSection'

type Block = {
  _key: string
  _type: string
  title?: string
  // other fields depending on the block type
}
export default function Layout({blocks}: {blocks: Block[]}) {
  return (
    <>
      {blocks.map((block) => {
        switch (block._type) {
          case 'textImageSection':
            return <TextImageSection key={block._key} data={block} />
          // other cases...
          default:
            return null
        }
      })}
    </>
  )
}
