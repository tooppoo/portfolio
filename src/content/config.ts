import { defineCollection, z } from 'astro:content';

const baseArticleScheme = ({ category }: { category: string }) => ({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date().optional().default(() => new Date()),
    category: z.literal(category),
    tags: z.array(z.string()).optional().default([]),
    layout: z.string().optional().default('../layouts/Layout.astro'),
  }),
} as const)

const armoredcoreCollection = defineCollection(baseArticleScheme({
  category: 'armoredcore',
}));
const techArchitectCollection = defineCollection(baseArticleScheme({
  category: 'tech',
}));
const philosophyCollection = defineCollection(baseArticleScheme({
  category: 'philosophy',
}));

export const collections = {
  armoredcore: armoredcoreCollection,
  'tech': techArchitectCollection,
  'philosophy': philosophyCollection,
};