# AGENTS.md — OpenAI Codex / Agent Instructions

## Project
React 18 portfolio site built with Vite, Chakra UI v2, Framer Motion, and Firebase Firestore.

## Do Not Read
Never read, index, or suggest changes inside:
- `node_modules/`
- `dist/`
- `dev-dist/`
- `package-lock.json`

## Folder Conventions

| Folder | Purpose |
|---|---|
| `src/components/` | Section-level page components (one per portfolio section) |
| `src/admin/` | `/admin` content portal (Firebase Auth + Firestore); `adminSchemas.js` defines the editable sections |
| `src/ui/` | Reusable, generic UI primitives shared across components |
| `src/skeletons/` | Per-section Suspense skeleton fallbacks; barrel-exported from `index.js` |
| `src/hooks/` | Custom React hooks (camelCase filenames, e.g. `useFirebase.js`) |
| `src/data/` | Static JS data/constants — **not** image or font assets |
| `src/utils/` | Pure utility functions with no side effects |
| `src/config/` | Third-party service configuration (Firebase, etc.) |

## Naming Conventions
- React components: **PascalCase** filenames (`SectionHeader.jsx`, `CardsList.jsx`)
- Hooks: `use` prefix, camelCase (`useFirebase.js`)
- Data files: camelCase (`experienceData.js`, `generic-data.js`)
- No kebab-case for React component files

## Key Patterns
- Each section is its own page: `App.jsx` is the layout (Header, Footer) and its `pages` table maps a route to a lazy-loaded section; header links live in `src/data/nav-links.js`
- All section components in `App.jsx` are lazy-loaded via `React.lazy` + `Suspense`
- The `HOC` wrapper in `App.jsx` accepts a `fallback` prop — pass the matching skeleton from `src/skeletons/`
- `src/ui/CardsList.jsx` is the shared card-grid renderer used by Services, Projects, Blogs, and Packages
- Section content is read through `useContent(key)` (`src/hooks/useContent.js`): each section is its own Firestore collection holding one doc, `{key}/content` = `{ value, builtIn }`, read over Firestore REST (no SDK on public pages; `/admin` uses `config/firebaseApp`), overriding the static defaults in `src/data/` (aggregated in `siteContent.js`; `about` is the profile photo/paragraph). Keep `src/data/` content JSON-serializable
- `useContent` suspends until its section is fetched (cached sections render immediately and refresh in the background), so every reader sits inside a `<Suspense>` with a matching skeleton. App's `pages` table lists each page's `sections` and starts those fetches together
- New section: add its default to `siteContent.js`, its schema to `adminSchemas.js`, and its name to `isSection` in `firestore.rules`
- The résumé contact button opens `components/ResumePicker` (via `hooks/useResumePicker`), listing the `resumes` section's versions. `utils/printResume(version)` fetches the résumé sections and renders `components/PrintResume` off-page, limited to the version's ticked skills / experience projects / projects; a version with `print: false` opens its `url` instead
- `/admin → GitHub` builds the profile README and details (`admin/githubReadme.js`) and posts them to the backend (`VITE_API_URL`), which verifies the admin's Firebase ID token and holds the GitHub token. Experience figures in the README are wrapped in `<!--experience:…-->`/`<!--duration:…-->` markers that the backend's daily Vercel cron recomputes. The backend is a separate repository, majidev-backend (sibling folder `../majidev-backend`); its `experience.py` mirrors `src/utils/getExpYears.js`, and its README lists the contracts to change on both sides
- `/admin` writes every section that has no Firestore doc yet (built-in content), in one batch (`admin/adminStore.js`). Admin `choices` fields offer items from other sections through `admin/adminContent.js`
- Route changes animate: App wraps its keyed `<Routes location>` in `AnimatePresence mode="wait"`; each page's shell (`HOC page`) and its `PageNav` spread `hooks/usePageMotion` so they leave and arrive together, the window scrolls to the top between the two, and `ui/RouteProgressBar` sweeps the top edge. The page animates in first, then shows its skeleton if its data is still loading; content fades in where the skeleton was. A new element rendered with a page uses `usePageMotion` too
- The profile photo (a data URL of up to ~700 kB in `about/content`) is read with `useContent("photo")`, and `useContent("about")` reads every other about field: `PARTS` in `useContent.js` fetches each with a Firestore field mask and caches it separately, so the intro text and the résumé never wait for or download the photo. Intro shows the photo in its own `<Suspense>` with a placeholder
- `/admin` sign-in is password + authenticator app code (Firebase TOTP multi-factor): `AdminLogin` finishes the sign-in through `getMultiFactorResolver`, and `AdminPage` shows the dashboard only to a session whose ID token has `signInSecondFactor === "totp"` (otherwise `TotpSetup` or a sign-in-again prompt). `firestore.rules` `isAdmin()` and the backend's `require_admin` require the same, so keep the three in step
- Content is text, never HTML: render it as React children (no `dangerouslySetInnerHTML`); `forSite` empties link fields whose scheme isn't http(s)/mailto/tel; `netlify.toml` sets a Content-Security-Policy, so a new third-party origin (API, image host, script) must be added there
- Content dates (`YYYY-MM-DD`) go through `utils/parseDate` (local calendar day), never `new Date(string)`, so figures match the backend in every time zone
- `src/data/contact-links.js` is plain data (icons by name via `src/data/contactIcons.js`); `hooks/useContactLinks` resolves contacts for `components/Contact.jsx` and `ContactPage.jsx`, turning the `printResume` action into a button that opens the résumé picker

## Sweep Every Copy After a Change
Facts about Majid (job title, company, skills, projects, dates, contact links, taglines) are repeated in many files that don't read from each other. After any change, before calling the work done:

1. **Grep for the old value** across the repo (and `../majidev-backend` when relevant), excluding the Do Not Read folders, and update every hit or say why it stays (for example a test's expected value at a fixed date, or a docs example).
2. **Check each copy below** that the change can touch:

| Where | What it repeats |
|---|---|
| `/admin` (Firestore) | The live content; `src/data/` is only the fallback. Tell the user what to edit there, since Claude can't |
| `src/data/*.js` | Built-in defaults: `experienceData.js` (role, company spelling), `project-links.js`, `skills.js`, `services.js`, `company-data.js`, `settings.js`, `resumes.js`, `github.js`, `contact-links.js` |
| `index.html` | `<title>`, meta description / keywords, Open Graph and Twitter tags, JSON-LD `Person` (`jobTitle`, `worksFor`, `knowsAbout`, `sameAs`) and `WebPage` |
| `src/ui/Helmet.jsx` | Per-page title, description, keywords, OG / Twitter tags and image (keep the image in step with `index.html`) |
| `vite.config.js` | PWA manifest `name`, `short_name`, `description` (plain text, no Markdown) |
| `public/sitemap.xml` | Every route in App's `pages` table, with `lastmod` set to the deploy date when content changed |
| `public/robots.txt`, `netlify.toml` | Sitemap URL; CSP when a new origin is used |
| `README.md` | Repo profile: title, About, Experience, Featured projects, Tech stack. It is static, so write fixed figures in a form that doesn't age ("since Oct 2022"), never a live count |
| GitHub profile | Rebuilt from `/admin → GitHub` (`admin/githubReadme.js`); remind the user to republish |
| `CLAUDE.md` / `AGENTS.md` | Keep both in step when a pattern changes |

3. **Experience figures are computed** (`utils/getExpYears.js`, the backend's `experience.py`, the `Y-M-D` placeholder). Never hardcode a duration in site code or content; Google shows the figure from its last crawl, so after a content or SEO change remind the user to request indexing in Search Console.
4. **Run `npm run build`** and report anything left for the user (admin edits, Firebase console, republishing the GitHub README).

## Commands
```bash
npm run dev       # start dev server
npm run build     # production build
npm run preview   # preview production build
```
