import { defineField, defineType } from 'sanity'

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
      name: 'images',
      title: 'Images du carousel',
      type: 'array',
      of: [
        {
          type: 'image',
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Légende',
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Texte alternatif',
              validation: (rule) =>
                rule.required().error("Le texte alternatif est requis pour l'accessibilité"),
            },
          ],
        },
      ],
      // validation: (rule) => rule.min(1).max(10).error('Veuillez ajouter entre 1 et 10 images'),
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
          name: 'urlType',
          type: 'string',
          title: 'Type de lien',
          options: {
            list: [
              {title: 'Lien interne', value: 'internal'},
              {title: 'Lien externe', value: 'external'},
            ],
            layout: 'radio',
            direction: 'horizontal',
          },
        }),
        defineField({
          name: 'internalLink',
          type: 'string',
          title: 'Page interne (ex: /contact)',
          hidden: ({parent}) => parent?.urlType !== 'internal',
        }),
        defineField({
          name: 'externalUrl',
          type: 'url',
          title: 'Lien externe',
          hidden: ({parent}) => parent?.urlType !== 'external',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'images.0', // Utilise la première image comme preview
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Hero Section',
        subtitle: subtitle || 'Pas de sous-titre',
        media,
      }
    },
  },
})
