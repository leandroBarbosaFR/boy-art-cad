import {defineField, defineType} from 'sanity'

export const textImageSection = defineType({
  name: 'textImageSection',
  type: 'object',
  title: 'Section avec Texte et Image ',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Titre',
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
      name: 'cta',
      type: 'object',
      title: 'Call to Action',
      fields: [
        defineField({
          name: 'label',
          type: 'string',
          title: 'Texte du bouton',
        }),
        defineField({
          name: 'url',
          type: 'url',
          title: 'Lien',
        }),
      ],
    }),
  ],
})
