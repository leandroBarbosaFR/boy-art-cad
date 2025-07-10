import {defineField, defineType} from 'sanity'

export const collectionImage = defineType({
  name: 'collectionImage',
  type: 'object',
  title: 'Image de la collection',
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Texte alternatif',
        }),
        defineField({
          name: 'title',
          type: 'string',
          title: "Titre de l'image",
        }),
        defineField({
          name: 'body',
          type: 'array',
          title: 'Description',
          of: [{type: 'block'}],
        }),
      ],
    }),

    defineField({
      name: 'collection',
      title: 'Collection parente',
      type: 'reference',
      to: [{type: 'collection'}],
    }),
  ],
})
