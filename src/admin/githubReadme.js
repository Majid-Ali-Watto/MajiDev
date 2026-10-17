import { getExperienceYear, getTotalExperince } from "../utils/getExpYears";

// Sections the profile README can include, in the order they appear
export const README_SECTIONS = [
  { value: "about", label: "About" },
  { value: "venture", label: "New venture" },
  { value: "experience", label: "Experience" },
  { value: "skills", label: "Skills" },
  { value: "projects", label: "Projects" },
  { value: "services", label: "Services" },
  { value: "packages", label: "Packages" },
  { value: "blogs", label: "Blogs" },
  { value: "contact", label: "Contact" },
  { value: "stats", label: "GitHub stats" },
];

// github-readme-stats cards, exactly as in the original profile README
const GITHUB_STATS = `# 📊 GitHub Stats
![](https://github-readme-stats.vercel.app/api?username=Majid-Ali-Watto&theme=dark&hide_border=false&include_all_commits=true&count_private=true)<br/>

![](https://github-readme-stats.vercel.app/api/top-langs/?username=Majid-Ali-Watto&theme=dark&hide_border=false&include_all_commits=true&count_private=true&layout=compact)`;

// Experience figures are wrapped in markers that carry the job dates they came from, so the backend's daily job can
// recompute them on GitHub (backend/services/experience.py in the majidev-backend repository). `experience` = a total, `duration` = one job,
// as the site shows them. Change the marker format there too.
const ranges = (jobs) => jobs.map((job) => `${job.startDate}~${job.endDate}`).join(",");
const totalExperience = (jobs, format = (text) => text) => `<!--experience:${ranges(jobs)}-->${format(getTotalExperince(jobs))}<!--/experience-->`;
const jobDuration = (job) => `<!--duration:${ranges([job])}-->${getExperienceYear(job.startDate, job.endDate)}<!--/duration-->`;

// Hidden copy of a bio that uses "Y-M-D", with the job dates, so the daily job can keep the bio current too
function bioState(content) {
  const { github, experience } = content;
  if (!github.updateProfile || !github.bio?.includes("Y-M-D")) return "";
  const state = JSON.stringify({ template: github.bio, experience: experience.map((job) => [job.startDate, job.endDate]) });
  return `<!--github-bio:${state.replaceAll("--", "-\\u002d")}-->`; // "--" can't appear inside an HTML comment
}

const monthYear = (date) => (date === "Present" ? "Present" : new Date(date).toLocaleDateString("en-US", { month: "short", year: "numeric" }));
const code = (items) => items.map((item) => `\`${item}\``).join(" ");

const renderers = {
  about: ({ about, experience }) => about.paragraph && ["## About", about.paragraph.replace("Y-M-D", totalExperience(experience, (text) => `**${text}**`))],

  venture: ({ company }) =>
    company.name && [
      `## 🚀 Building ${company.link ? `[${company.name}](${company.link})` : company.name}`,
      [company.tagline && `**${company.tagline}**`, company.status && `_${company.status}_`].filter(Boolean).join(" · "),
      company.description,
      company.stack?.length && code(company.stack),
    ],

  experience: ({ experience }) =>
    experience.length && [
      "## 💼 Experience",
      experience
        .map((job) => {
          const where = [job.company, job.location].filter(Boolean).join(", ");
          const when = `${monthYear(job.startDate)} – ${monthYear(job.endDate)} (${jobDuration(job)})`;
          const projects = job.projects.filter((project) => project.name).map((project) => `  - ${project.name}`);
          return [`- **${job.role}** · ${where} · ${when}`, ...projects].join("\n");
        })
        .join("\n"),
    ],

  skills: ({ skills }) => skills.length && ["## 🛠️ Skills", skills.map((category) => `**${category.label}:** ${category.items.map((skill) => skill.label).join(" · ")}`).join("<br>\n")],

  projects: ({ projects, github }) => {
    const shown = github.projects?.length ? projects.filter((project) => github.projects.includes(project.title)) : projects.filter((project) => project.includeInResume);
    return (
      shown.length && [
        "## 📂 Projects",
        shown
          .map((project) => {
            const links = [project.link && `[Live](${project.link})`, project.gLink && `[Code](${project.gLink})`].filter(Boolean).join(" · ");
            return [`- **${project.title}**${links ? ` — ${links}` : ""}`, `  ${project.description}`, project.stack?.length && `  ${code(project.stack)}`].filter(Boolean).join("<br>\n");
          })
          .join("\n"),
      ]
    );
  },

  services: ({ services }) => services.length && ["## 🧰 Services", services.map((service) => `- **${service.title}** — ${service.description}`).join("\n")],

  packages: ({ packages }) =>
    packages.length && ["## 📦 npm packages", packages.map((pkg) => `- **${pkg.link ? `[${pkg.title}](${pkg.link})` : pkg.title}** — ${pkg.description}`).join("\n")],

  blogs: ({ blogs }) => blogs.length && ["## ✍️ Writing", blogs.map((blog) => `- [${blog.title}](${blog.link})`).join("\n")],

  contact: ({ contacts }) => {
    const links = contacts.filter((contact) => contact.action !== "printResume" && contact.href);
    return links.length && ["## 📫 Reach me", links.map((contact) => `[${contact.title}](${contact.href})`).join(" · ")];
  },

  stats: () => [GITHUB_STATS],
};

// The profile README as Markdown, from the content the site shows (`content` = every section, defaults applied).
// `siteUrl` is linked at the bottom as the source.
export function buildReadme(content, siteUrl) {
  const { settings, github } = content;
  const included = github.readmeSections?.length ? github.readmeSections : README_SECTIONS.map(({ value }) => value);
  const blocks = README_SECTIONS.filter(({ value }) => included.includes(value))
    .map(({ value }) => renderers[value](content))
    .filter(Boolean)
    .map((parts) => parts.filter(Boolean).join("\n\n"));

  return [
    `# Hi, I'm ${settings.devName} 👋`,
    settings.roles.length && `**${settings.roles.join(" · ")}**`,
    ...blocks,
    `<sub>Generated from my portfolio, [${new URL(siteUrl).host}](${siteUrl}).</sub>`,
    bioState(content),
  ]
    .filter(Boolean)
    .join("\n\n")
    .concat("\n");
}

// GitHub profile details to send: empty text fields are left out so they stay as they are on GitHub.
// "Y-M-D" in the bio becomes the total experience.
export function buildProfile({ settings, github, experience }) {
  const bio = github.bio?.replace("Y-M-D", getTotalExperince(experience));
  const fields = { name: github.name || settings.devName, bio, company: github.company, location: github.location, blog: github.blog };
  return { ...Object.fromEntries(Object.entries(fields).filter(([, value]) => value?.trim())), hireable: !!github.hireable };
}
