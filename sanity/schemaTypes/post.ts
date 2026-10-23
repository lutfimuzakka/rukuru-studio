import { defineField, defineType } from 'sanity'

/** Journal posts. The Journal page ships after launch; the schema is ready now. */
export const post = defineType({
  name: 'post',
  title: 'Journal post',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'date', type: 'date' }),
    defineField({ name: 'category', type: 'string', options: { list: ['Opinion', 'Process', 'News'] } }),
    defineField({ name: 'cover', type: 'media' }),
    defineField({ name: 'excerpt', type: 'text', rows: 3 }),
    defineField({ name: 'body', type: 'array', of: [{ type: 'block' }, { type: 'media' }] }),
  ],
})
