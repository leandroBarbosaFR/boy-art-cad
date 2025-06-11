import {defineType, defineField} from 'sanity'

export const footerType = defineType({
  name: 'footer',
  title: 'Pied de page',
  type: 'document',
  fields: [
    defineField({
      name: 'links',
      title: 'Liens',
      type: 'array',
      of: [{type: 'link'}],
    }),
  ],
})
