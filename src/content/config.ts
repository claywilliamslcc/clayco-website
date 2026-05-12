import { defineCollection, z, reference } from 'astro:content';

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
    founded: z.date(),
    archived: z.date().optional(), // set when the term ends
    // Optional: link to the student's external work
    external: z
      .object({
        instagram: z.string().url().optional(),
        youtube: z.string().url().optional(),
        website: z.string().url().optional(),
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
    date: z.date(),
    // For video posts: external URL (YouTube, Vimeo) or direct asset
    videoUrl: z.string().url().optional(),
    // For posts that include an image (especially social posts)
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    // Term is inherited from the business at build time but can be
    // overridden if a business publishes across terms (rare).
    term: z.string().optional(),
  }),
});

/**
 * A comment from one business on another's post.
 * Comments publish instantly. Any logged-in user can delete any comment
 * via the inline button on the post page.
 * One markdown file per comment in `src/content/comments/`.
 */
const comments = defineCollection({
  type: 'content',
  schema: z.object({
    post: reference('posts'),       // which post this comment is on
    business: reference('businesses'), // which business is commenting (the byline)
    date: z.coerce.date(),          // coerce so YAML datetime strings (HH:mm) parse cleanly
    // The comment body is the markdown body of the file (handled by Decap automatically)
  }),
});

export const collections = { businesses, posts, comments };
