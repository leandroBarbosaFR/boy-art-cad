// schemas/productPage.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'productPage',
  title: 'Page Produit',
  type: 'document',
  fields: [
    defineField({
      name: 'productType',
      title: 'Type de produit',
      type: 'string',
      description: 'Ex. : Platines vinyles. Ce nom apparaît dans le menu du site.',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      description: 'Adresse de la page sur le site. Cliquez sur « Generate ».',
      options: {
        source: 'productType',
        maxLength: 96
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
              name: 'slug',
              title: 'Slug (URL)',
              type: 'slug',
              description: 'Adresse de la page détail. Cliquez sur « Generate ». Sans slug, pas de page détail.',
              options: {
                source: (_doc, { parent }) => (parent as { title?: string })?.title || '',
                maxLength: 96,
                // Unicité vérifiée au niveau de la galerie (voir validation ci-dessous)
                isUnique: () => true
              }
            },
            {
              name: 'excerpt',
              title: 'Extrait',
              type: 'text',
              rows: 3,
              description: 'Description courte (2-3 lignes)'
            },
            {
              name: 'description',
              title: 'Description complète',
              type: 'array',
              description: 'Affichée sur la page détail',
              of: [{ type: 'block' }]
            },
            {
              name: 'images',
              title: 'Images supplémentaires',
              type: 'array',
              description: 'Affichées sur la page détail',
              of: [
                {
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
                }
              ]
            }
          ],
          preview: {
            select: {
              title: 'title',
              media: 'image'
            }
          }
        }
      ],
      validation: Rule =>
        Rule.custom((items: { slug?: { current?: string } }[] | undefined) => {
          const slugs = (items || []).map(item => item.slug?.current).filter(Boolean)
          return new Set(slugs).size === slugs.length
            ? true
            : 'Deux éléments de la galerie ont le même slug.'
        })
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