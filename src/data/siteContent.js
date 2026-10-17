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

// What the public site renders for one section, given its stored document { value, builtIn }.
// `builtIn` is a list section's admin "Show default data" switch: the built-in list shows even though an edited copy is stored.
// Single-record sections fall back per field instead: a field missing from `value` keeps its default.
export function forSite(key, stored) {
  if (stored?.value === undefined || stored.builtIn) return siteContent[key];
  return withDefaults({ [key]: stored.value })[key];
}
