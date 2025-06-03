import {defineType, defineField} from 'sanity'

export const collectionsIndex = defineType({
  name: 'collectionsIndex',
  title: 'Page des collections',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre de la page',
      type: 'string',
    }),
    defineField({
      name: 'intro',
      title: 'Texte d’introduction',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
     defineField({
        name: 'link',
        type: 'link',
        title: 'Lien',
      }),
  ],
})
