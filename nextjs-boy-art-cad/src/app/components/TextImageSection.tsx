import React from 'react'

interface TextImageSectionProps {
  data: {
    title?: string
  }
}

export default function TextImageSection({data}: TextImageSectionProps) {
  const heading = data.title || ''

  return (
    <section>
      <h2>{heading}</h2>
    </section>
  )
}
