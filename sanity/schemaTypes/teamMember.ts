import { defineField, defineType } from 'sanity'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team member',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'role', type: 'string' }),
    defineField({ name: 'photo', type: 'media' }),
    defineField({ name: 'bio', type: 'text', rows: 3 }),
    defineField({ name: 'order', type: 'number' }),
  ],
})
