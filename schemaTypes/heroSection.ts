import {defineField, defineType} from 'sanity'

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Section du haut de la page',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      // validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-title',
      type: 'string',
      // validation: (rule) => rule.required(),
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
