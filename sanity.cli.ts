import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'jk5fbq4q',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  },
})
