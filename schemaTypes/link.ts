import {defineType, defineField} from 'sanity'

export const link = defineType({
  name: 'link',
  title: 'Lien',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Texte',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'internal',
      title: 'Lien interne',
      type: 'reference',
      to: [{type: 'contact'}, {type: 'about'}, {type: 'pages'}, {type: 'collectionsIndex'}],
    }),
    defineField({
      name: 'external',
      title: 'URL externe',
      type: 'url',
    }),
    defineField({
      name: 'anchor',
      title: 'Lien d’ancrage (e.g. #about)',
      type: 'string',
      validation: (Rule) =>
        Rule.custom((val) => {
          if (val && !val.startsWith('#')) return 'L’ancre doit commencer par "#"'
          return true
        }),
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Ouvrir dans une nouvelle tab',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  validation: (Rule) =>
    Rule.custom((link) => {
      if (!link) return true

      const hasDestination = link.internal || link.external || link.anchor
      if (!hasDestination) {
        return 'Vous devez spécifier un lien interne, externe ou un lien d’ancrage.'
      }

      return true
    }),
})
