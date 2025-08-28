// schemas/productPage.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'productPage',
  title: 'Page Produit',
  type: 'document',
  fields: [
    defineField({
      name: 'productType',
      title: 'Type de produit',
      type: 'string',
      options: {
        list: [
          { title: 'Bornes', value: 'bornes' },
          { title: 'Cassettes', value: 'cassettes' },
          { title: 'Tableaux', value: 'tableaux' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'string'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }]
    }),
    defineField({
      name: 'mainImage',
      title: 'Image principale',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Texte alternatif',
          type: 'string'
        }
      ]
    }),
    defineField({
      name: 'gallery',
      title: 'Galerie',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'galleryItem',
          title: 'Élément de galerie',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true
              },
              fields: [
                {
                  name: 'alt',
                  title: 'Texte alternatif',
                  type: 'string'
                }
              ]
            },
            {
              name: 'title',
              title: 'Titre',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'excerpt',
              title: 'Extrait',
              type: 'text',
              rows: 3,
              description: 'Description courte (2-3 lignes)'
            }
          ],
          preview: {
            select: {
              title: 'title',
              media: 'image'
            }
          }
        }
      ]
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string'
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text'
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'productType',
      media: 'mainImage'
    }
  }
})