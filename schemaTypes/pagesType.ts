import {defineField, defineType} from 'sanity'

export const pagesType = defineType({
  name: 'pages',
  type: 'document',
  title: 'Pages légales',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Titre de la page',
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
