# ClayCo Website

A static publishing platform for COMM 130 student businesses at Lane Community College. Replaces the prior Wix site at `williamsc552.wixsite.com/clayco`.

## Stack

- **Astro** (static site generator) — fast, accessible, no JavaScript needed at runtime.
- **Decap CMS** — the form-based editor at `/admin` that students use to publish posts.
- **Netlify** — hosting, CDN, identity (student logins), and Git Gateway (Decap → GitHub commits).
- **GitHub** — source of truth for site code and content.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

## Build for production

```bash
npm run build
npm run preview
```

The `dist/` directory contains the deployable static site.

## Project structure

```
clayco-website/
├── astro.config.mjs
├── package.json
├── public/
│   ├── admin/                  # Decap CMS — student-facing editor
│   │   ├── index.html
│   │   └── config.yml
│   └── favicon.svg
├── src/
│   ├── content/
│   │   ├── config.ts           # Content schemas (businesses, posts)
│   │   ├── businesses/         # One markdown file per student business
│   │   └── posts/              # One markdown file per post
│   ├── layouts/
│   │   └── Base.astro          # Masthead, nav, footer
│   ├── pages/
│   │   ├── index.astro         # Homepage (Industries + Recent Posts + About)
│   │   ├── industries/[slug].astro   # Per-business page
│   │   ├── posts/[slug].astro        # Per-post page
│   │   ├── about.astro
│   │   ├── showcase.astro
│   │   ├── 404.astro
│   │   └── rss.xml.js
│   ├── site.config.ts          # `currentTerm`, branding, switches
│   └── styles/global.css
└── mockups/                    # Static HTML mockups (v1–v4) for reference
```

## Term lifecycle

Each business and post has a `term` field (e.g. `"Spring 2026"`). The homepage filters Industries to whatever `site.currentTerm` is set to in `src/site.config.ts`. To roll over to a new term:

1. Edit `src/site.config.ts` and change `currentTerm`.
2. Deactivate the prior term's student CMS accounts in Netlify Identity.
3. Invite the new cohort.

Posts and pages from prior terms remain live indefinitely at the same URLs. The byline (business name) persists.

## Past Industries

The data model already tracks past terms via the `term` field, but the public-facing "Past Industries" page is hidden until we have at least one full term to archive. To turn it back on later: flip `showPastIndustries: true` in `src/site.config.ts` and add the corresponding nav link in `src/layouts/Base.astro`. Reference design lives in `mockups/mockup-v3.html`.

## Editorial workflow for students

Students go to [`https://clayco.work/admin`](https://clayco.work/admin), log in with their Netlify Identity account, pick a content type (Blog, Social, or Promo Video), fill in the form, and hit **Publish**. The site rebuilds in ~30 seconds.

## Deployment

Connected to Netlify; pushes to `main` trigger a deploy. See `DEPLOY.md` (forthcoming) for the one-time setup.
