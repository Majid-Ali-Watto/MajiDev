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
- All section components in `App.jsx` are lazy-loaded via `React.lazy` + `Suspense`
- The `HOC` wrapper in `App.jsx` accepts a `fallback` prop — pass the matching skeleton from `src/skeletons/`
- `src/ui/CardsList.jsx` is the shared card-grid renderer used by Services, Projects, Blogs, and Packages
- `src/data/contact-links.js` imports from `utils/printResume` — keep that relative path intact

## Commands
```bash
npm run dev       # start dev server
npm run build     # production build
npm run preview   # preview production build
```
