import {defineField, defineType} from 'sanity'

export const landingPageType = defineType({
  name: 'landingPage',
  type: 'document',
  title: 'Page d’accueil',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Titre de la page',
    }),
    defineField({
      name: 'layout',
      type: 'array',
      title: 'Page Layout',
      of: [
        {type: 'textImageSection'},
        {type: 'heroSection'},
        {type: 'imageSection'},
        {type: 'collectionSection'},
        {type: 'embedSection'},
      ],
    }),
  ],
})
