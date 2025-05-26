import TextImageSection from '../components/TextImageSection'


export default function Layout({ blocks }: { blocks: any[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block._type) {
          case 'textImageSection':
            return <TextImageSection key={i} data={block} />
          // case 'textSection':
          //   return <TextSection key={i} data={block} />
          default:
            return null
        }
      })}
    </>
  )
}
