import {defineField, defineType} from 'sanity'

export const embedSection = defineType({
  name: 'embedSection',
  type: 'object',
  title: 'Section avec un Embed ( youtube video, mp4 video )',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Titre',
    }),
    defineField({
      name: 'embed',
      type: 'url',
      title: 'Lien à intégrer (iframe, vidéo, etc.)',
      description: 'Colle ici une URL de type YouTube, Vimeo, Google Maps, etc.',
    }),
  ],
})
