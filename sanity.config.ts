'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { apiVersion, dataset, projectId } from './sanity/env'
import { schemaTypes } from './sanity/schemaTypes'

export default defineConfig({
  name: 'rukuru-studio',
  title: 'Rukuru Studio',
  basePath: '/studio',
  projectId: projectId || 'missing',
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem().title('Site settings').id('siteSettings').child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.divider(),
            S.documentTypeListItem('project').title('Case studies'),
            S.documentTypeListItem('service').title('Services'),
            S.documentTypeListItem('teamMember').title('Team'),
            S.documentTypeListItem('post').title('Journal'),
          ]),
    }),
  ],
  apiVersion,
})
