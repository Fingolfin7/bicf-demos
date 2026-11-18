import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

/*
 * Every collection here is edited through the CMS at /admin.
 * The field names match src/cms/config.yml one-to-one, so when you
 * add a field in one place, add it in the other.
 */

const settings = defineCollection({
  loader: file('src/content/settings.json', { parser: (text) => ({ site: JSON.parse(text) }) }),
  schema: z.object({
    name: z.string(),
    shortName: z.string(),
    tagline: z.string(),
    intro: z.string(),
    mission: z.string(),
    serviceDay: z.string(),
    serviceTime: z.string(),
    venue: z.string(),
    address: z.string(),
    area: z.string(),
    mapUrl: z.string(),
    email: z.string(),
    facebook: z.string(),
    directions: z.array(z.object({ step: z.string(), detail: z.string() })),
  }),
});

/** Which pages appear in which menu, in order. Each list holds page ids (file names). */
const menus = defineCollection({
  loader: file('src/content/menus.json', { parser: (text) => ({ main: JSON.parse(text) }) }),
  schema: z.object({
    more: z.array(z.string()).default([]),
    joinIn: z.array(z.string()).default([]),
    whoWeAre: z.array(z.string()).default([]),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    image: z.string().optional(),
    form: z.string().optional(),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    time: z.string(),
    location: z.string(),
    summary: z.string(),
    image: z.string().optional(),
    signup: z.string().optional(),
  }),
});

const groups = defineCollection({
  loader: glob({ pattern: '**/*.yml', base: './src/content/groups' }),
  schema: z.object({
    name: z.string(),
    day: z.enum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']),
    time: z.string(),
    frequency: z.string().default('Every week'),
    place: z.string(),
    audience: z.string(),
    contact: z.string().optional(),
    description: z.string(),
    image: z.string().optional(),
    page: z.string().optional(),
    order: z.number().default(50),
  }),
});

const signups = defineCollection({
  loader: glob({ pattern: '**/*.yml', base: './src/content/signups' }),
  schema: z.object({
    title: z.string(),
    intro: z.string(),
    date: z.coerce.date(),
    closes: z.coerce.date().optional(),
    image: z.string().optional(),
    slots: z.array(
      z.object({
        label: z.string(),
        note: z.string().optional(),
        capacity: z.number().int().min(1),
        // Sample "already taken" count so the demo looks lived-in.
        // In production this number comes from the sign-up database.
        taken: z.number().int().min(0).default(0),
      }),
    ),
  }),
});

const forms = defineCollection({
  loader: glob({ pattern: '**/*.yml', base: './src/content/forms' }),
  schema: z.object({
    title: z.string(),
    intro: z.string().optional(),
    submitLabel: z.string().default('Send'),
    successTitle: z.string().default('Thank you'),
    successMessage: z.string(),
    sendTo: z.string(),
    storeEntries: z.boolean().default(true),
    consent: z.string(),
    fields: z.array(
      z.object({
        label: z.string(),
        name: z.string(),
        type: z.enum(['text', 'email', 'tel', 'textarea', 'select', 'radio', 'checkbox', 'date', 'number']),
        required: z.boolean().default(false),
        help: z.string().optional(),
        options: z.array(z.string()).optional(),
        width: z.enum(['full', 'half']).default('full'),
      }),
    ),
  }),
});

const thoughts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/thoughts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    author: z.string(),
    excerpt: z.string(),
    image: z.string().optional(),
    scripture: z.string().optional(),
  }),
});

export const collections = { settings, menus, pages, events, groups, signups, forms, thoughts };
