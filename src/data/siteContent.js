import { experienceData } from "./experienceData";
import { educationData } from "./educationData";
import { skillsData } from "./skills";
import { projects } from "./project-links";
import { services } from "./services";
import { blogs } from "./blogs";
import { packages } from "./packages";
import { companyData } from "./company-data";
import { settings } from "./settings";
import { contactLinks } from "./contact-links";
import { resumes } from "./resumes";
import { github } from "./github";

// Built-in defaults. A Firestore `{key}/content` document overrides its section (edited from /admin).
export const siteContent = {
  // Developer photo and intro paragraph. Empty: Intro and the printed résumé use the built-in photo and text.
  about: { imageBase64: "", paragraph: "" },
  experience: experienceData,
  education: educationData,
  skills: skillsData,
  projects,
  services,
  blogs,
  packages,
  company: companyData,
  contacts: contactLinks,
  settings,
  resumes,
  github,
};

// Merges stored content over the defaults. Single-record sections (settings, company) merge field by field,
// so a record saved before a field existed still gets that field's default instead of `undefined`.
export function withDefaults(stored = {}) {
  const merged = { ...siteContent, ...stored };
  for (const [key, value] of Object.entries(siteContent)) {
    if (!Array.isArray(value)) merged[key] = { ...value, ...stored[key] };
  }
  return merged;
}

// List items the admin hid (the eye toggle in /admin) carry `[VISIBLE]: false`: they stay stored but the site leaves them out
export const VISIBLE = "visible";

export const isHidden = (...items) => items.some((item) => item?.[VISIBLE] === false);

// `value` without hidden list items, at any depth (e.g. a hidden project inside a job, or a hidden skill inside a category)
export function withoutHidden(value) {
  if (Array.isArray(value)) return value.filter((item) => !isHidden(item)).map(withoutHidden);
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([name, v]) => [name, withoutHidden(v)]));
  return value;
}

// One section's content from its stored document { value, builtIn }, hidden items included.
// `builtIn` is a list section's admin "Show default data" switch: the built-in list shows even though an edited copy is stored.
// Single-record sections fall back per field instead: a field missing from `value` keeps its default.
export function sectionContent(key, stored) {
  if (stored?.value === undefined || stored.builtIn) return siteContent[key];
  return withDefaults({ [key]: stored.value })[key];
}

// What the public site renders for one section. Every site reader goes through here (pages and the printed résumé),
// and /admin publishes the same view to GitHub, so hidden items are dropped in this one place.
export const forSite = (key, stored) => withoutHidden(sectionContent(key, stored));

// The `stats` section is derived, not edited: the home page's figures, so it fetches this small document instead of the
// whole sections they come from. /admin rewrites it with every save of a source section (admin/adminStore.js).
// Each visible job keeps its dates (not a fixed "3Y 11M") so the total stays current; `experience.length` = companies.
export const STATS_SOURCES = ["experience", "projects", "packages"];

// `view` = the source sections as the site shows them (forSite)
export function statsFor({ experience, projects, packages }) {
  return { experience: experience.map(({ startDate, endDate }) => ({ startDate, endDate })), projects: projects.length, packages: packages.length };
}

// Built-in stats, from the built-in sections; used until /admin has written the stats document
siteContent.stats = statsFor(Object.fromEntries(STATS_SOURCES.map((key) => [key, forSite(key)])));
