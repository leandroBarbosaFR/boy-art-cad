import {defineField, defineType} from 'sanity'

export const collectionSection = defineType({
  name: 'collectionSection',
  type: 'object',
  title: 'Section avec des collections',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Titre',
    }),
    defineField({
      name: 'body',
      type: 'array',
      title: 'Description',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'images',
      type: 'array',
      title: 'Images',
      of: [{type: 'collectionImage'}],
    }),
  ],
})
