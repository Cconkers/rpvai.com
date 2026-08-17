import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    role: z.string(),
    stack: z.array(z.string()),
    url: z.string(),
    featured: z.boolean(),
    placeholder: z.boolean().default(false),
    year: z.union([z.number(), z.string()]),
    summary: z.string(),
  }),
});

export const collections = { projects };
