import { devFullName, devPost } from "./generic-data";

export const settings = {
  // Developer's name: intro heading, footer, page title and printed résumé
  devName: devFullName,
  // Rotating headline under the name; the first one is also the résumé title
  roles: [devPost, "Vue.js / Nuxt.js / React Specialist", "Python & FastAPI Engineer", "Microservices & DevOps"],
  // Logo text in the header
  brandName: "Majidev.",
  // Theme for visitors who haven't used the toggle: "dark" | "light"
  defaultTheme: "dark",
  // Data URL of a custom favicon; empty keeps the static one from /public
  favicon: "",
};
