import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { markdownSchema } from 'sanity-plugin-milkdown';

export default defineConfig({
  name: 'default',
  title: 'enpitsulin.xyz',
  projectId: 'r9a6ysjd',
  dataset: 'production',
  plugins: [deskTool(), markdownSchema()],
  schema: {
    types: [
      {
        name: 'post',
        type: 'document',
        title: 'Post',
        fields: [
          {
            name: 'title',
            title: 'Title',
            type: 'string'
          },
          {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
              source: 'title'
            }
          },
          {
            name: 'summary',
            title: 'Summary',
            type: 'string'
          },
          {
            name: 'content',
            title: 'Content',
            type: 'markdown'
          },
          {
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
              layout: 'tags'
            }
          },
          {
            name: 'date',
            title: 'Date',
            type: 'datetime'
          }
        ]
      }
    ]
  }
});
