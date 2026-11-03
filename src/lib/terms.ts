import { getCollection } from 'astro:content';
import { site } from '../site.config';

/**
 * Term helpers for the Industries directory and the homepage.
 *
 * A term is a string like "Fall 2026". Businesses carry the term; posts
 * inherit it from their business. Anything that isn't `site.currentTerm`
 * counts as a past term.
 */

const SEASONS: Record<string, number> = { winter: 1, spring: 2, summer: 3, fall: 4 };

/** Sortable number for a term ("Fall 2026" -> 20264). Unknown formats sort last. */
export function termSortKey(term: string): number {
  const m = term.trim().match(/^(winter|spring|summer|fall)\s+(\d{4})$/i);
  return m ? Number(m[2]) * 10 + SEASONS[m[1].toLowerCase()] : 0;
}

/** URL fragment for a term ("Spring 2026" -> "spring-2026"). */
export function termAnchor(term: string): string {
  return term.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

/**
 * Tagline plus location for directory lists. Avoids "a time., Eugene, OR"
 * when a student's tagline already ends in punctuation.
 */
export function taglineWithLocation(tagline: string, location?: string): string {
  const t = tagline.trim();
  if (!location) return t;
  return /[.!?]$/.test(t) ? `${t} ${location}` : `${t}, ${location}`;
}

/** "1 industry" / "6 industries", "1 post" / "15 posts". */
export function plural(n: number, one: string, many = `${one}s`): string {
  return `${n} ${n === 1 ? one : many}`;
}

/**
 * Every term that has at least one business, newest first, with its
 * businesses (A to Z) and total post count.
 */
export async function getIndustriesByTerm() {
  const businesses = await getCollection('businesses');
  const posts = await getCollection('posts');

  const postsPerBusiness = new Map<string, number>();
  for (const p of posts) {
    const id = p.data.business.id;
    postsPerBusiness.set(id, (postsPerBusiness.get(id) ?? 0) + 1);
  }

  const byTerm = new Map<string, typeof businesses>();
  for (const b of businesses) {
    const list = byTerm.get(b.data.term) ?? [];
    list.push(b);
    byTerm.set(b.data.term, list);
  }

  const terms = [...byTerm.entries()]
    .map(([term, list]) => ({
      term,
      anchor: termAnchor(term),
      isCurrent: term === site.currentTerm,
      businesses: list.sort((a, b) => a.data.name.localeCompare(b.data.name)),
      postCount: list.reduce((n, b) => n + (postsPerBusiness.get(b.slug) ?? 0), 0),
    }))
    .sort((a, b) => termSortKey(b.term) - termSortKey(a.term));

  return {
    current: terms.find((t) => t.isCurrent),
    past: terms.filter((t) => !t.isCurrent),
  };
}
