# Rukuru Studio — website

Next.js 16 (App Router, Cache Components) · Tailwind 4 · GSAP + Lenis · Sanity · Vercel.

## Run it

```bash
npm install
cp .env.example .env.local   # optional — works without any env
npm run dev                  # http://localhost:3000
```

With no Sanity project configured, the site runs on `lib/content/placeholder.ts`:
three placeholder case studies (Project 01–03, fictional clients, labelled media blocks).

## Connect Sanity

1. Create a project at sanity.io/manage (free), dataset `production`.
2. Put the project ID in `.env.local` as `NEXT_PUBLIC_SANITY_PROJECT_ID`.
3. In the Sanity project, add `http://localhost:3000` (and your Vercel URLs) under API → CORS origins, with credentials.
4. Open `/studio` and add content. Fields missing in Sanity fall back to the local defaults.
5. Content is cached for an hour. For instant updates, add a Sanity webhook that calls a route running `revalidateTag('content')`.

Mark unfinished case studies as **Placeholder** in Studio — they are hidden on the production deployment.

## Where things live

```
app/(site)/            pages: Home, Work, /work/[slug], Services, About, Contact, 404
app/studio/            embedded Sanity Studio at /studio
components/motion/     Reveal, RotatingWords, SmoothScroll (Lenis), Cursor, GSAP setup
components/site/       Header, Footer, Media, ProjectCard, WorkIndex, ContactForm
components/blocks/     case-study blocks (full media, two-up, grid, text, quote, results, palette)
lib/content/           types, placeholder content, Sanity queries
sanity/                env, client, schemas
app/globals.css        design + motion tokens, page transition
```

## Design tokens

Paper `#F5F5F2`, ink `#101014`, ultramarine `#3A2EFF` (used sparingly), stone `#8A8A93`.
One typeface: Bricolage Grotesque (self-hosted via Fontsource), condensed and heavy for display.
Motion: `ease-out cubic-bezier(.22,1,.36,1)`, 200 / 600 / 1000 ms, 60 ms stagger.
All motion respects `prefers-reduced-motion`; content is readable without JavaScript.

## Still to do (needs real content)

- Replace placeholder case studies, team and studio photos.
- Logo SVG (header currently uses a text wordmark).
- Social profile links and the studio email (`hello@rukurustudio.com` is a placeholder).
- Showreel video (Home shows it automatically once set in Site settings).
- Open Graph images per page.
