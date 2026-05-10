# AI Context

## Project Snapshot

This is a Next.js landing page for the public brand «Зеленый Контур» / goslend.ru.
The legal entity is ООО «КАРБОДЕЗ» and should be kept only where legally needed, such as policy, requisites, license context, and contracts.

Business focus:
- Land plot treatment and protection in Moscow and Moscow Oblast.
- Services include ticks, hogweed, moles, bark beetle, mosquitoes, wasps, snakes/bats, mowing, arboristics, and tree treatment.
- Main conversion goal: phone calls and lead forms.

Tech stack:
- Next.js 16.2.1 App Router
- React 19.2.4
- TypeScript strict mode
- Tailwind CSS 4
- Framer Motion
- shadcn/Base UI style components
- react-imask for phone masks

Important instruction:
- This project uses a new Next.js version. Before changing Next APIs or conventions, read relevant docs from `node_modules/next/dist/docs/`.

## Structure

Main page:
- `src/app/page.tsx`

Global layout, SEO metadata, JSON-LD, global wrappers:
- `src/app/layout.tsx`

Global styles:
- `src/app/globals.css`

Shared project data:
- `src/lib/site-data.ts`
- Contains company contacts, service cards/prices, FAQ data, area served, and helper `absoluteUrl`.
- `Services`, `Pricing`, `FAQ`, sitemap, metadata, and JSON-LD should read from this file to avoid content/SEO drift.

Landing sections:
- `src/components/sections/Hero.tsx`
- `src/components/sections/Partners.tsx`
- `src/components/sections/Numbers.tsx`
- `src/components/sections/Services.tsx`
- `src/components/sections/HowWeWork.tsx`
- `src/components/sections/VideoStories.tsx` (temporarily paused; component kept but not rendered from `src/app/page.tsx`)
- `src/components/sections/Pricing.tsx`
- `src/components/sections/BeforeAfter.tsx`
- `src/components/sections/Licenses.tsx`
- `src/components/sections/Team.tsx`
- `src/components/sections/Reviews.tsx`
- `src/components/sections/LeadCapture.tsx`
- `src/components/sections/FAQ.tsx`
- `src/components/sections/Contacts.tsx`

Layout and persistent UI:
- `src/components/layout/Header.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/layout/QuizModal.tsx`
- `src/components/layout/FloatingContact.tsx`
- `src/components/layout/MobileStickyCTA.tsx`
- `src/components/layout/Preloader.tsx`
- `src/components/layout/ScrollProgress.tsx`

Assets:
- `public/images/**`
- `public/videos/hero_bg.mp4`
- `public/videos/demo.mp4`
- `public/documents/**`

## Current Known State

SEO foundation:
- `src/app/layout.tsx` now has canonical metadata, OpenGraph/Twitter image metadata, and richer JSON-LD.
- JSON-LD includes `Organization`, `HomeAndConstructionBusiness`, `WebSite`, `WebPage`, `OfferCatalog`, and synchronized `FAQPage`.
- `src/app/robots.ts` was replaced by static `src/app/robots.txt` so Yandex `Clean-param` can be included.
- `src/app/sitemap.ts` uses fixed `lastModified: '2026-04-16'` and includes image sitemap entries.
- Public street address is intentionally hidden. The business is presented as a service-area company for Moscow and Moscow Oblast.
- Business data such as license/social links still needs owner verification before production.

Lead forms:
- Forms submit to `src/app/api/lead/route.ts`.
- Email delivery uses `nodemailer` and Mail.ru SMTP.
- Required env vars are documented in `.env.example`.
- The recipient/contact email is `dezinsektsiauchastkov@yandex.ru`.
- MAX messenger URL is `https://max.ru/u/f9LHodD0cOLKNnLRWaIf4ovFT8ZmEZipdSgZP_TGY1dfHYWkff3SZ0Jmhws`.
- Telegram URL is `https://t.me/green_outline`.
- Do not commit real SMTP passwords; set `SMTP_PASS` in local `.env.local` and Vercel environment variables.

Production build:
- `npm run build` succeeds when network access is available for `next/font/google`.
- The sandboxed build failed without network because Google Fonts could not be fetched.

Lint:
- `npm run lint -- --ignore-pattern '.claude/**'` passes.
- Plain `npm run lint` passes because `.claude/**` is ignored in `eslint.config.mjs`.

Git:
- Last checked state: branch `main` was ahead of `origin/main` by 1 commit.
- Working tree was clean before this file was added.

## Product / Implementation Notes

The site is visually advanced and already has a full sales landing structure:
- Hero with video background.
- Service cards and pricing.
- Process section.
- Video stories.
- Before/after slider.
- License/trust section.
- Team, reviews, FAQ, contacts.
- Cookie banner and privacy modal.
- Mobile sticky CTA and floating desktop contact button.

Most sections are client components with `'use client'`.
This is fine for animation-heavy UI, but static content could later be moved to server components to reduce shipped JS.

`VideoStories` is intentionally paused until real video reports are ready. The component and assets remain in the codebase, but `src/app/page.tsx` does not render it.

## Priority Issues

1. Configure lead email delivery in deployment.
   - Add Mail.ru SMTP env vars from `.env.example` to Vercel and local `.env.local`.
   - `SMTP_HOST=smtp.mail.ru`, `SMTP_PORT=587`, `SMTP_SECURE=false`, `SMTP_USER=qwerty528356@mail.ru`.
   - `SMTP_PASS` must be stored only in ignored local/deployment environment variables, not committed to git.
   - Without `SMTP_PASS`, `/api/lead` returns a clear setup error instead of pretending success.

2. External contact links should be rechecked before production.
   - Telegram currently uses `https://t.me/green_outline`.
   - MAX currently uses the provided `max.ru` profile URL.
   - Email currently uses `dezinsektsiauchastkov@yandex.ru`.

3. Media needs cleanup.
   - `public/videos/hero_bg.mp4` is about 86 MB and should be compressed or replaced for production.
   - `public/videos/demo.mp4` is not a real video; it contains an XML `AccessDenied` response.
   - The PDF license file should be opened and verified manually; system `file` reported it as a 0-page PDF.

4. Real business data should be verified.
   - Phone: `+7 (999) 895-99-89`
   - Email: `dezinsektsiauchastkov@yandex.ru`
   - Telegram: `https://t.me/green_outline`
   - MAX: `https://max.ru/u/f9LHodD0cOLKNnLRWaIf4ovFT8ZmEZipdSgZP_TGY1dfHYWkff3SZ0Jmhws`
   - Public address is hidden until a real client-facing office address is available.
   - License details, reviews, ratings, partners, and requisites should be checked before production.

## Useful Commands

Start dev server:
```bash
npm run dev
```

Build:
```bash
npm run build
```

Lint with Claude worktrees ignored:
```bash
npm run lint -- --ignore-pattern '.claude/**'
```

Search files:
```bash
rg --files
```

Search text:
```bash
rg "pattern" src
```

## Local Dev Server

The site was started successfully at:
- `http://localhost:3000`

Next also printed a network URL:
- `http://172.20.10.2:3000`
