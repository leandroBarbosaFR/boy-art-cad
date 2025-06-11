import {defineField, defineType} from 'sanity'

export const aboutType = defineType({
  name: 'about',
  type: 'document',
  title: 'À propos',
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
      name: 'cta',
      type: 'object',
      title: 'Call to Action',
      fields: [
        defineField({
          name: 'title',
          type: 'string',
          title: 'Titre du bloc CTA',
        }),
        defineField({
          name: 'link',
          type: 'link',
          title: 'Lien',
        }),
      ],
    }),
  ],
})
