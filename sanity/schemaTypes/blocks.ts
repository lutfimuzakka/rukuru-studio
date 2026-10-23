import { defineArrayMember, defineField, defineType } from 'sanity'

const fullMedia = defineArrayMember({
  name: 'fullMedia',
  title: 'Full-width media',
  type: 'object',
  fields: [
    defineField({ name: 'media', type: 'media' }),
    defineField({ name: 'caption', type: 'string' }),
  ],
  preview: { select: { title: 'caption', media: 'media.image' }, prepare: (s) => ({ title: s.title || 'Full-width media', media: s.media }) },
})

const twoUp = defineArrayMember({
  name: 'twoUp',
  title: 'Two side by side',
  type: 'object',
  fields: [defineField({ name: 'left', type: 'media' }), defineField({ name: 'right', type: 'media' })],
  preview: { prepare: () => ({ title: 'Two side by side' }) },
})

const grid = defineArrayMember({
  name: 'grid',
  title: 'Grid',
  type: 'object',
  fields: [defineField({ name: 'items', type: 'array', of: [{ type: 'media' }], validation: (r) => r.min(2).max(6) })],
  preview: { prepare: () => ({ title: 'Grid' }) },
})

const textBlock = defineArrayMember({
  name: 'textBlock',
  title: 'Text',
  type: 'object',
  fields: [defineField({ name: 'heading', type: 'string' }), defineField({ name: 'body', type: 'text', rows: 5 })],
  preview: { select: { title: 'heading' }, prepare: (s) => ({ title: s.title || 'Text' }) },
})

const quote = defineArrayMember({
  name: 'quote',
  title: 'Quote',
  type: 'object',
  fields: [defineField({ name: 'text', type: 'text', rows: 3 }), defineField({ name: 'author', type: 'string' })],
  preview: { select: { title: 'text' } },
})

const stats = defineArrayMember({
  name: 'stats',
  title: 'Results (only real numbers)',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      type: 'array',
      of: [{ type: 'object', fields: [{ name: 'value', type: 'string' }, { name: 'label', type: 'string' }] }],
      validation: (r) => r.min(2).max(4),
    }),
  ],
  preview: { prepare: () => ({ title: 'Results' }) },
})

const colorPalette = defineArrayMember({
  name: 'colorPalette',
  title: 'Colour palette',
  type: 'object',
  fields: [
    defineField({
      name: 'colors',
      type: 'array',
      of: [{ type: 'object', fields: [{ name: 'name', type: 'string' }, { name: 'hex', type: 'string' }] }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Colour palette' }) },
})

/** Free-form building blocks for a case study, in any order. */
export const sections = defineType({
  name: 'sections',
  title: 'Sections',
  type: 'array',
  of: [fullMedia, twoUp, grid, textBlock, quote, stats, colorPalette],
})
