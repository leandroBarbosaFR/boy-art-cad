import {defineField, defineType} from 'sanity'

export const imageSection = defineType({
  name: 'imageSection',
  type: 'object',
  title: 'Section avec des Images',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Titre',
    }),
    defineField({
      name: 'images',
      type: 'array',
      title: 'Images',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
  ],
})
