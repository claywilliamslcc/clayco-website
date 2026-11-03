# ClayCo Website

The public publishing platform for COMM 130 student businesses at Lane Community College.

Live at: **[clayco.work](https://clayco.work)**

## Stack

- **Astro** (static site generator) — fast, accessible, no runtime JavaScript on the public pages.
- **Decap CMS** at `/admin` — the form-based editor students use to publish posts.
- **Netlify** — hosting, CDN, identity (student accounts), and Git Gateway (CMS → GitHub commits).
- **GitHub** — source of truth for site code and content.

## How students use it

1. Visit [clayco.work/admin](https://clayco.work/admin).
2. Click **Sign Up** in the login modal.
3. Enter a Lane email (`yourname@my.lanecc.edu`) and a password. No invite or confirmation needed.
4. Logged in immediately. Use the editor to create your business and posts.

Full student guide: [docs/student-guide.md](docs/student-guide.md) — same content lives publicly at [clayco.work/guide](https://clayco.work/guide).

## Content model

| Collection | Folder | What it is |
|---|---|---|
| Businesses | `src/content/businesses/` | One file per student-run business |
| Posts | `src/content/posts/` | Blog, social, or promo-video posts attributed to a business |
| Comments | `src/content/comments/` | Short replies on other businesses' posts |

Schemas live in `src/content/config.ts`.

## Term lifecycle

Each business has a `term` field (e.g., `"Fall 2026"`), and posts inherit their business's term. The homepage shows only the current term's industries and posts. Every earlier term is listed under Past Industries: a short list on the homepage and the full archive at `/industries`. Pages and posts stay live at the same URLs indefinitely.

To roll over to a new term:

1. `src/site.config.ts`: change `currentTerm`; update `showcase` (date, time, place; set `poster` back to `null` until the new poster exists); add the ending term to `pastTerms` if its showcase poster should stay linked from the archive.
2. `public/admin/config.yml`: change the Term field's `default` to the new term, so new businesses land in the right term.
3. Netlify, Identity tab: delete the previous term's student accounts (sort by created date). Every signed-in account can edit any content, so old accounts shouldn't linger.
4. Student guide (`src/pages/guide.md`, mirrored in `docs/student-guide.md`): check office hours and anything else term-specific.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

## Build for production

```bash
npm run build
```

Netlify runs this automatically on every push to `main`. No manual deploy step.

## Project structure

```
clayco-website/
├── astro.config.mjs
├── package.json
├── docs/
│   └── student-guide.md     # Reference doc, also published at /guide
├── public/
│   ├── admin/               # Decap CMS — student-facing editor
│   │   ├── index.html
│   │   └── config.yml
│   ├── logo.jpg
│   ├── og-image.jpg
│   └── uploads/             # Student-uploaded images
├── scripts/
│   └── rename-businesses.sh # One-time script (already run, kept for reference)
├── src/
│   ├── lib/
│   │   └── terms.ts         # Term sorting + Industries-by-term helper
│   ├── content/
│   │   ├── config.ts
│   │   ├── businesses/
│   │   ├── posts/
│   │   └── comments/
│   ├── layouts/
│   │   ├── Base.astro
│   │   └── MarkdownPage.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── industries/index.astro   # Current + Past Industries directory
│   │   ├── industries/[slug].astro
│   │   ├── posts/[slug].astro
│   │   ├── posts/index.astro
│   │   ├── about.astro
│   │   ├── showcase.astro
│   │   ├── guide.md
│   │   ├── 404.astro
│   │   └── rss.xml.js
│   ├── site.config.ts
│   └── styles/global.css
└── mockups/                 # Pre-build design mockups (v1-v4)
```

## Settings of note (Netlify)

- **Identity → Registration:** Open (anyone with a Lane email signs up directly)
- **Identity → Email confirmation:** Disabled (no second-email verification step)
- **Identity → Git Gateway:** Enabled (lets the CMS commit on students' behalf)
- **Domain:** clayco.work via Netlify DNS

## Comments + moderation

Anyone signed into ClayCo can delete any comment via the inline Delete link on a post page. Every deletion is a git commit, so abuse is auditable. Public visitors who aren't signed in cannot delete anything.

## Maintainer

Clay Williams — williamsc@lanecc.edu
