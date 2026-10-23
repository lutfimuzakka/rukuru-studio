import { defineField, defineType } from 'sanity'

/** An image or a video, always with alt text. */
export const media = defineType({
  name: 'media',
  title: 'Media',
  type: 'object',
  fields: [
    defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'videoUrl', title: 'Video URL (Mux/Cloudinary/mp4)', type: 'url' }),
    defineField({ name: 'alt', title: 'Alt text', type: 'string', validation: (r) => r.required() }),
  ],
  preview: { select: { title: 'alt', media: 'image' } },
})
