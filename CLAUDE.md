# CLAUDE.md — Claude Code Instructions

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
- `/admin` writes every section that has no Firestore doc yet (built-in content) and moves legacy `content/*` + `uploads/*` data, in one batch (`admin/adminStore.js`). Admin `choices` fields offer items from other sections through `admin/adminContent.js`
- `src/data/contact-links.js` is plain data (icons by name via `src/data/contactIcons.js`); `hooks/useContactLinks` resolves contacts for `components/Contact.jsx` and `ContactPage.jsx`, turning the `printResume` action into a button that opens the résumé picker

## Commands
```bash
npm run dev       # start dev server
npm run build     # production build
npm run preview   # preview production build
```
