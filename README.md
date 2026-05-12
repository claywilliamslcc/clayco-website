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

Each business and post has a `term` field (e.g., `"Spring 2026"`). The homepage filters Industries to whatever `site.currentTerm` is set to in `src/site.config.ts`. To roll over to a new term:

1. Edit `src/site.config.ts` and change `currentTerm`.
2. Prior term's businesses automatically slide into the (currently hidden) Past Industries archive. Posts and pages stay live indefinitely.

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
