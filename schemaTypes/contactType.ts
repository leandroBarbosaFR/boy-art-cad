import {defineField, defineType} from 'sanity'

export const contactType = defineType({
  name: 'contact',
  type: 'document',
  title: 'Page de contact',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Titre de la page',
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'string',
    }),
    defineField({
      name: 'body',
      type: 'array',
      title: 'Description',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug (URL)',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'layout',
      type: 'array',
      title: 'Page Layout',
      of: [{type: 'textImageSection'}],
    }),
  ],
})
