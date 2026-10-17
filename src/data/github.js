import { devLocation } from "./generic-data";

// What /admin → GitHub publishes to the GitHub profile, via the separate majidev-backend service (see VITE_API_URL).
// `readmeSections` and `projects` pick what the profile README shows; empty means all (projects: those marked includeInResume).
// Profile fields left empty are not changed on GitHub; an empty `name` uses Settings → developer name.
export const github = {
  updateReadme: true,
  readmeSections: [],
  projects: [],
  updateProfile: true,
  name: "",
  bio: "Full Stack Web Developer · Vue.js / Nuxt.js / React · Python / FastAPI microservices · Kafka · Docker",
  company: "@AZM Development",
  location: devLocation,
  blog: "https://majidev.netlify.app",
  hireable: true,
};
