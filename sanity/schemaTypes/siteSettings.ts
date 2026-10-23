import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({ name: 'tagline', type: 'string' }),
    defineField({ name: 'taglineWords', title: 'Rotating words', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'intro', type: 'text', rows: 4 }),
    defineField({ name: 'showreel', type: 'media' }),
    defineField({ name: 'email', type: 'string' }),
    defineField({ name: 'whatsapp', title: 'WhatsApp number (digits only, e.g. 62881…)', type: 'string' }),
    defineField({ name: 'whatsappDisplay', type: 'string' }),
    defineField({
      name: 'socials',
      type: 'array',
      of: [{ type: 'object', fields: [{ name: 'label', type: 'string' }, { name: 'href', type: 'url' }] }],
    }),
    defineField({
      name: 'about',
      type: 'object',
      fields: [{ name: 'heading', type: 'string' }, { name: 'body', type: 'array', of: [{ type: 'text' }] }],
    }),
    defineField({
      name: 'process',
      type: 'array',
      of: [{ type: 'object', fields: [{ name: 'title', type: 'string' }, { name: 'body', type: 'text', rows: 2 }] }],
    }),
  ],
})
