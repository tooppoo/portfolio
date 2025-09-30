import { defineCollection, z } from 'astro:content';

const armoredcoreCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date().optional().default(() => new Date()),
    category: z.string().default('armoredcore'),
    tags: z.array(z.string()).optional().default([]),
    layout: z.string().optional().default('../layouts/Layout.astro'),
  }),
});

const techArchitectCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date().optional().default(() => new Date()),
    category: z.string().default('tech'),
    tags: z.array(z.string()).optional().default([]),
    layout: z.string().optional().default('../layouts/Layout.astro'),
  }),
});

export const collections = {
  armoredcore: armoredcoreCollection,
  'tech': techArchitectCollection,
};