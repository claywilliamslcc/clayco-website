import rss from '@astrojs/rss';
import { getCollection, getEntry } from 'astro:content';
import { site } from '../site.config';

export async function GET(context) {
  const posts = (await getCollection('posts')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  const items = await Promise.all(
    posts.map(async (post) => {
      const biz = await getEntry(post.data.business);
      return {
        title: `${post.data.title} — ${biz.data.name}`,
        pubDate: post.data.date,
        description: biz.data.tagline,
        link: `/posts/${post.slug}/`,
      };
    })
  );

  return rss({
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    site: context.site,
    items,
    customData: `<language>en-us</language>`,
  });
}
