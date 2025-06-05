// schemas/category.ts
import {defineType, defineField} from 'sanity'

export const category = defineType({
  name: 'category',
  type: 'document',
  title: 'Catégories',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Nom de la catégorie',
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
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
