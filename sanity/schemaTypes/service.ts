import { defineField, defineType } from 'sanity'

export const service = defineType({
  name: 'service',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'description', type: 'text', rows: 3 }),
    defineField({ name: 'deliverables', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'relatedProjects', type: 'array', of: [{ type: 'reference', to: [{ type: 'project' }] }] }),
    defineField({ name: 'order', type: 'number' }),
  ],
})
