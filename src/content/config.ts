import { defineCollection, z, reference } from 'astro:content';

// Decap CMS writes empty strings ("") for optional fields the student leaves
// blank. Zod's .url() and .date() validators reject empty strings even when
// the field is .optional(). This preprocessor converts empty/whitespace strings
// to undefined so optional() actually behaves as expected.
const emptyToUndefined = (val: unknown) =>
  typeof val === 'string' && val.trim() === '' ? undefined : val;

const optionalUrl = () => z.preprocess(emptyToUndefined, z.string().url().optional());
const optionalDate = () => z.preprocess(emptyToUndefined, z.coerce.date().optional());
const optionalString = () => z.preprocess(emptyToUndefined, z.string().optional());

/**
 * A student-run fictional business publishing under ClayCo.
 * One markdown file per business in `src/content/businesses/`.
 */
const businesses = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    description: z.string(),
    location: z.string().default('Eugene, OR'),
    term: z.string(), // e.g. "Spring 2026"
    founded: z.coerce.date(),
    archived: optionalDate(),
    external: z
      .object({
        instagram: optionalUrl(),
        youtube: optionalUrl(),
        website: optionalUrl(),
      })
      .optional(),
  }),
});

/**
 * A post under a business: blog, social media, or promo video.
 * One markdown file per post in `src/content/posts/`.
 */
const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    type: z.enum(['blog', 'social', 'video']),
    business: reference('businesses'),
    date: z.coerce.date(),
    videoUrl: optionalUrl(),
    image: optionalString(),
    imageAlt: optionalString(),
    term: optionalString(),
  }),
});

/**
 * A comment from one business on another's post.
 * One markdown file per comment in `src/content/comments/`.
 */
const comments = defineCollection({
  type: 'content',
  schema: z.object({
    post: reference('posts'),
    business: reference('businesses'),
    date: z.coerce.date(),
  }),
});

export const collections = { businesses, posts, comments };
