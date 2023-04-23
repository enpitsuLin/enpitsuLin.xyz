import { z, defineCollection } from "astro:content"

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    excerpt: z.string(),
    tags: z.array(z.string()).optional(),
    lang: z.string().optional(),
    updateDate: z.date().optional()
  }),
});

export const collections = { blog };
