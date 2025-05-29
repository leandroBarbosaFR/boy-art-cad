import React from 'react'
import {
  PortableText,
  type PortableTextReactComponents,
  type PortableTextComponentProps,
} from '@portabletext/react'
import type {PortableTextBlock} from '@portabletext/types'

const portableTextComponents: Partial<PortableTextReactComponents> = {
  block: {
    h1: ({children}: PortableTextComponentProps<PortableTextBlock>) => (
      <h1 className="text-4xl font-bold my-4">{children}</h1>
    ),
    h2: ({children}: PortableTextComponentProps<PortableTextBlock>) => (
      <h2 className="text-3xl font-semibold my-3">{children}</h2>
    ),
    h3: ({children}: PortableTextComponentProps<PortableTextBlock>) => (
      <h3 className="text-2xl font-medium my-2">{children}</h3>
    ),
    normal: ({children}: PortableTextComponentProps<PortableTextBlock>) => (
      <p className="my-2">{children}</p>
    ),
  },
  list: {
    bullet: ({children}) => <ul className="list-disc list-inside mb-4">{children}</ul>,
    number: ({children}) => <ol className="list-decimal list-inside mb-4">{children}</ol>,
  },
  listItem: {
    bullet: ({children}) => <li className="mb-1">{children}</li>,
    number: ({children}) => <li className="mb-1">{children}</li>,
  },
}

type Props = {
  value: PortableTextBlock[]
}

export default function PortableTextRenderer({value}: Props) {
  return <PortableText value={value} components={portableTextComponents} />
}
