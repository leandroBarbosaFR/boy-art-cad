// sanity/schemas/siteSettings.ts
import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  type: 'document',
  title: 'Paramètres du site',
  fields: [
    defineField({
      name: 'collectionsPageTitle',
      type: 'string',
      title: 'Titre de la page Collections',
      description: 'Titre affiché sur la page index collections',
    }),
  ],
  preview: {
    select: {
      title: 'collectionsPageTitle',
    },
  },
})
