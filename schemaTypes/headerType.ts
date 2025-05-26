import {defineType, defineField} from 'sanity'

export const headerType = defineType({
  name: 'header',
  title: 'En tête',
  type: 'document',
  fields: [
    defineField({
      name: 'links',
      title: 'Liens',
      type: 'array',
      of: [{type: 'links'}],
    }),
  ],
})
