import {defineField, defineType} from 'sanity'

export const cookiesType = defineType({
  name: 'cookies',
  title: 'Cookies',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      // validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})
