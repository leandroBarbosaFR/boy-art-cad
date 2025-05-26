import { defineType } from 'sanity'
import { textImageSection } from './textImageSection'

export const landingPage = defineType({
  name: 'landingPage',
  type: 'document',
  title: 'Landing Page',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Page Title',
    },
    {
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    },
    {
      name: 'layout',
      type: 'array',
      title: 'Page Layout',
      of: [
        { type: 'textImageSection' },
        // outros layouts que você queira adicionar futuramente...
      ],
    },
  ],
})
