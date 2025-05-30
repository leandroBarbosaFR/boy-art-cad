import {defineField, defineType} from 'sanity'

export const collection = defineType({
  name: 'collection',
  type: 'document',
  title: 'Collections',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Titre de la collection',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'subtitle',
      type: 'string',
      title: 'Sous-titre',
    }),
    defineField({
      name: 'description',
      type: 'array',
      title: 'Description',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'price',
      type: 'number',
      title: 'Prix',
    }),
    defineField({
      name: 'dimensions',
      type: 'string',
      title: 'Dimensions',
      description: 'Exemple: 40x60 cm',
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      title: 'Image principale',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Texte alternatif',
        }),
      ],
    }),
    defineField({
      name: 'images',
      type: 'array',
      title: 'Images de la collection',
      of: [{type: 'collectionImage'}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'mainImage',
    },
    prepare(selection) {
      const {title, subtitle, media} = selection
      return {
        title: title,
        subtitle: subtitle,
        media: media,
      }
    },
  },
})
