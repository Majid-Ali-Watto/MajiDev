# Majidev: Developer Guide

How the portfolio site at [majidev.netlify.app](https://majidev.netlify.app/) is built, run and deployed.
For the portfolio itself, see [README.md](README.md).

## Contents

- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Scripts](#scripts)
- [Project structure](#project-structure)
- [How it works](#how-it-works)
- [Adding or changing content](#adding-or-changing-content)
- [Deployment](#deployment)
- [Two-step sign-in (/admin)](#two-step-sign-in-admin)
- [Backend (majidev-backend)](#backend-majidev-backend)

## Tech stack

| Area | Tools |
|---|---|
| UI | React 18, Chakra UI v2 (Emotion), Framer Motion, React Icons |
| Routing | React Router v7, one page per section, lazy-loaded |
| Build | Vite 4, `vite-plugin-pwa` (installable, offline-capable) |
| Content | Firebase Firestore (read over REST on public pages), static defaults in `src/data/` |
| Admin | Firebase Auth with TOTP two-step sign-in, `/admin` content portal |
| Hosting | Netlify, deployed by GitHub Actions |
| Backend | [majidev-backend](https://github.com/Majid-Ali-Watto/majidev-backend) (FastAPI on Vercel), publishes to the GitHub profile |

## Getting started

**Prerequisites:** Node.js 22 (CI uses 22.5) and npm.

```bash
git clone https://github.com/Majid-Ali-Watto/MajiDev.git
cd MajiDev
npm install
cp .env.example .env    # fill in the Firebase values (see below)
npm run dev             # http://localhost:5173
```

Without Firebase values the public pages still render their built-in content from `src/data/`; `/admin` needs them.

## Environment variables

Defined in [.env.example](.env.example). Vite inlines `VITE_` variables at build time, so change them and rebuild.

| Variable | Purpose |
|---|---|
| `VITE_APP_APIKEY`, `VITE_APP_AUTH_DOMAIN`, `VITE_APP_PROJECT_ID`, `VITE_APP_STORAGE_BUCKET`, `VITE_APP_MESSAGING_SENDER_ID`, `VITE_APP_APP_ID` | Firebase web app config (Firebase console → Project settings → Your apps). Not secret: it ships in the browser bundle. |
| `VITE_SITE_URL` | Public site address: canonical and social-preview URLs, header logo, GitHub README credit |
| `VITE_API_URL` | majidev-backend address; enables `/admin → GitHub`. Also update `connect-src` in [netlify.toml](netlify.toml) if it changes. |

## Scripts

```bash
npm run dev       # dev server (also on the LAN via --host)
npm run build     # production build into dist/
npm run preview   # serve the production build locally
npm run lint      # ESLint, zero warnings allowed (CI fails otherwise)
```

## Project structure

```
MajiDev/
├── index.html                # HTML shell, meta tags, SEO
├── vite.config.js            # Vite + PWA (service worker, manifest)
├── netlify.toml              # SPA redirect, security headers, Content-Security-Policy
├── firestore.rules           # Firestore rules: public read, admin-only write
├── .env.example              # Environment variables template
├── .github/workflows/
│   └── deploy-netlify.yaml   # Lint, build and deploy on push to latest-ui
├── public/                   # Static files served as-is: project images, icons, robots.txt, sitemap.xml
└── src/
    ├── main.jsx              # Entry point
    ├── Root.jsx              # Providers (Chakra, router, helmet) and the /admin route
    ├── App.jsx               # Layout (Header, Footer) and the `pages` table: route → lazy section + skeleton
    ├── style.css             # Global styles
    │
    ├── components/           # One component per portfolio section
    │   ├── Header.jsx, Footer.jsx, PageNav.jsx
    │   ├── Intro.jsx, About.jsx, Stats.jsx, Welcome.jsx, HireMe.jsx, Animate.jsx
    │   ├── Experience.jsx, Skills.jsx, Services.jsx, Company.jsx
    │   ├── Projects.jsx, Blogs.jsx, Packages.jsx, Education.jsx
    │   ├── Contact.jsx, ContactPage.jsx
    │   └── PrintResume.jsx, ResumePicker.jsx
    │
    ├── admin/                # /admin content portal (loaded only when opened)
    │   ├── AdminPage.jsx, AdminLogin.jsx, TotpSetup.jsx, CodeInput.jsx
    │   ├── adminSchemas.js   # Editable sections and their fields
    │   ├── adminStore.js     # Firestore reads and batched writes
    │   ├── adminContent.js   # Cross-section choices for admin fields
    │   ├── SectionEditor.jsx, Fields.jsx, resizeImage.js
    │   └── GitHubPublish.jsx, githubReadme.js   # Build and publish the GitHub profile README
    │
    ├── ui/                   # Reusable UI primitives
    │   ├── CardsList.jsx     # Card grid for Services, Projects, Blogs, Packages
    │   ├── TimelineCard.jsx, Accordion.jsx, SectionHeader.jsx
    │   ├── ErrorBoundary.jsx, Helmet.jsx, RouteProgressBar.jsx
    │   └── SiteSettings.jsx, ThemeToggleButton.jsx
    │
    ├── skeletons/            # Suspense loading skeletons, one per section type (barrel: index.js)
    │
    ├── hooks/
    │   ├── useContent.js     # Reads a section from Firestore, falls back to src/data defaults
    │   ├── usePageMotion.js  # Shared page enter/leave animation
    │   ├── useContactLinks.js, useResumePicker.js
    │
    ├── data/                 # Default content (JSON-serializable) and constants
    │   ├── siteContent.js    # Aggregates every section's defaults; derives `stats`
    │   ├── generic-data.js   # Name, email, links
    │   ├── experienceData.js, educationData.js, skills.js, services.js
    │   ├── project-links.js, packages.js, blogs.js, company-data.js
    │   ├── contact-links.js, resumes.js, settings.js, github.js, nav-links.js
    │   └── skillIcons.js, contactIcons.js, fadeInUpTransitionConfig.js
    │
    ├── utils/                # Pure helpers
    │   ├── getExpYears.js    # Experience durations (mirrored by the backend)
    │   ├── parseDate.js, toLocaleDateString.js, printResume.js
    │
    └── config/
        ├── firebaseConfig.js # Reads the VITE_APP_* variables
        ├── firebaseApp.js    # Firebase SDK (admin only)
        └── colorMode.js
```

### Conventions

- Components: PascalCase filenames (`SectionHeader.jsx`). Hooks: `use` prefix, camelCase (`useContent.js`).
- `src/data/` holds content only (no images or fonts); keep it JSON-serializable so it can be stored in Firestore.
- Content is plain text rendered as React children, never HTML.
- Content dates (`YYYY-MM-DD`) go through `utils/parseDate`, never `new Date(string)`.

## How it works

1. **Pages:** every header link (`src/data/nav-links.js`) is a route in the `pages` table in `App.jsx`. Each page is
   lazy-loaded and shows its skeleton from `src/skeletons/` while loading. Route changes animate with Framer Motion.
2. **Content:** each section has built-in defaults in `src/data/`. At runtime `useContent(key)` reads the Firestore
   document `{key}/content` over REST and, if present, uses it instead. Hidden items (`visible: false`) and unsafe
   links are filtered out in `siteContent.js` before any page sees them.
3. **Admin:** `/admin` is a content portal behind password + authenticator code. Saving writes to Firestore, so the
   live site updates without a redeploy.
4. **Résumé:** the Résumé contact button lets visitors pick a résumé version, rendered from the same content and
   printed from the browser.
5. **GitHub profile:** `/admin → GitHub` builds the profile README and sends it to majidev-backend, which commits it
   and keeps its experience figures current daily.

## Adding or changing content

- **Day to day:** sign in at `/admin` and edit; no code change or deploy needed.
- **Built-in defaults:** edit the matching file in `src/data/`. Firestore content, once saved, takes priority.
- **A new section:** add its default to `src/data/siteContent.js`, its schema to `src/admin/adminSchemas.js`, its name
  to `isSection` in `firestore.rules`, then a page entry in `App.jsx` and a link in `nav-links.js`.
- **A new third-party origin** (API, image host, script): add it to the Content-Security-Policy in `netlify.toml`.

## Deployment

Pushing to the **`latest-ui`** branch runs [deploy-netlify.yaml](.github/workflows/deploy-netlify.yaml):
`npm ci` → lint → build → deploy `dist/` to production. It can also be run by hand from the Actions tab.
To roll back, publish an earlier deploy from Netlify → Deploys (each deploy's message names its commit).

Repository settings needed (Settings → Secrets and variables → Actions):

- **Variables:** every `VITE_` value from `.env.example`
- **Secrets:** `NETLIFY_AUTH_TOKEN`, `NETLIFY_SITE_ID`

Firestore rules are not deployed by CI: publish `firestore.rules` from the Firebase console (Firestore → Rules) after
changing it.

## Two-step sign-in (/admin)

`/admin` signs in with your password **and** a 6-digit code from an authenticator app (Google Authenticator, Microsoft
Authenticator, 1Password, Authy…). Firestore rules and the backend only accept a session that used the code, so a leaked
password alone can't change the site or publish to GitHub.

A sign-in lasts until its browser tab closes (`src/config/firebaseApp.js`), so each new tab asks for the password and
code again.

**One-time setup on the Firebase project** (in this order, steps 2 and 3 in one sitting: until step 3 adds your
authenticator, anyone with the password could add theirs instead):

1. Firebase console → Authentication → Settings → **Upgrade to Firebase Authentication with Identity Platform**
   (the console shows its pricing before you confirm; a single admin account is far inside the free usage).
2. Turn on authenticator apps (TOTP). The console has no switch for it, so run this once, e.g. in Google Cloud Shell
   (replace `PROJECT_ID` with the site's `VITE_APP_PROJECT_ID`):
   ```bash
   curl -X PATCH "https://identitytoolkit.googleapis.com/admin/v2/projects/PROJECT_ID/config?updateMask=mfa" \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "X-Goog-User-Project: PROJECT_ID" \
     -H "Content-Type: application/json" \
     -d '{"mfa": {"providerConfigs": [{"state": "ENABLED", "totpProviderConfig": {"adjacentIntervals": 5}}]}}'
   ```
3. Deploy the site, open `/admin`, sign in, and follow **Set up two-step sign-in**: scan the QR code, enter a code, then
   sign in again with password + code. Save the setup key it shows in your password manager: it's how you add the
   account to a new phone.
4. Only now publish `firestore.rules` (Firebase console → Firestore → Rules) and deploy majidev-backend. Before step 3
   they would lock you out of saving, since no session of yours has used a code yet.

**Lost the phone and the setup key?** First change the password (Firebase console → Authentication → Users), then
remove the second factor with the Firebase Admin SDK (`getAuth().updateUser(uid, { multiFactor: { enrolledFactors: null } })`),
then set it up again right away. While no factor is enrolled, the password alone is enough to enroll one.

**Hidden is not private.** Every section is publicly readable over the Firestore REST API, and items hidden with the
eye toggle are only filtered out in the browser. Don't store anything in `/admin` you wouldn't publish.

## Backend (majidev-backend)

A separate repository: a small FastAPI service on Vercel that publishes the profile README and details to GitHub and
refreshes experience figures daily. Its README covers setup, environment variables, and the contracts that must change
on both sides together (`src/admin/githubReadme.js` and `src/utils/getExpYears.js` here).
