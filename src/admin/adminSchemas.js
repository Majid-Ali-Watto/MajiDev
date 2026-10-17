import { FaAddressBook, FaBriefcase, FaConciergeBell, FaFileAlt, FaGithub, FaGraduationCap, FaNpm, FaPalette, FaPenNib, FaProjectDiagram, FaRocket, FaTools, FaUser } from "react-icons/fa";
import { contactIcons } from "../data/contactIcons";
import { isHidden } from "../data/siteContent";
import { skillIcons } from "../data/skillIcons";
import { README_SECTIONS } from "./githubReadme";

const iconOptions = Object.keys(skillIcons);
const contactIconOptions = Object.keys(contactIcons);
const colorOptions = ["teal", "purple", "blue", "orange", "green", "red", "pink", "cyan", "yellow", "gray"];

const text = (name, label, extra) => ({ type: "text", name, label, ...extra });
const area = (name, label, extra) => ({ type: "textarea", name, label, ...extra });
const tags = (name, label, hint) => ({ type: "tags", name, label, hint: hint ?? "Comma separated" });
// Checkboxes over items of other sections. `options(content)` gets the saved content of every section (hidden items included)
// and returns [{ value, label, group?, hidden? }]; the field stores the checked values. `hidden` marks items the site leaves out.
const choices = (name, label, options, hint) => ({ type: "choices", name, label, options, hint });

const DATE = { pattern: /^\d{4}-\d{2}-\d{2}$/, hint: "YYYY-MM-DD" };

const imageHint = "Path under /public (e.g. /my-project.webp) or a full URL";
const cardFields = {
  projects: [
    text("title", "Title", { required: true }),
    text("link", "Live preview URL"),
    text("gLink", "GitHub URL"),
    text("imgURL", "Image", { hint: imageHint }),
    area("description", "Description", { required: true }),
    tags("stack", "Tech stack"),
    { type: "boolean", name: "includeInResume", label: "Include in printed resume" },
  ],
  services: [
    text("title", "Title", { required: true }),
    text("link", "Link"),
    text("imgURL", "Image", { hint: imageHint }),
    area("description", "Description", { required: true }),
  ],
  blogs: [
    text("title", "Title", { required: true }),
    text("link", "Blog URL", { required: true }),
    text("imgURL", "Image", { hint: imageHint }),
    area("description", "Description", { required: true }),
  ],
  packages: [
    text("title", "Title", { required: true }),
    text("link", "npm URL"),
    text("gLink", "GitHub URL"),
    text("imgURL", "Image", { hint: imageHint }),
    area("description", "Description", { required: true }),
  ],
};

const contactActionOptions = [
  { value: "link", label: "Open a link" },
  { value: "printResume", label: "Résumé: let visitors pick a version (Résumés section)" },
];
const contactColorOptions = [{ value: "", label: "Default" }, ...colorOptions.filter((color) => color !== "gray").map((color) => ({ value: color, label: color }))];

// kind "list": ordered array of items (order here = order on the site). kind "object": a single record.
export const sections = [
  {
    key: "about",
    icon: FaUser,
    description: "Developer photo and intro paragraph shown on the home page.",
    label: "About",
    kind: "object",
    fields: [
      {
        type: "image",
        name: "imageBase64",
        label: "Developer photo",
        image: { size: 800, mime: "image/webp" },
        hint: "Cropped to a square and resized in your browser. Remove it to fall back to the built-in photo.",
      },
      area("paragraph", "About paragraph", { rows: 8, hint: 'Use "Y-M-D" where the total experience should be inserted. Leave empty for the built-in text.' }),
    ],
  },
  {
    key: "contacts",
    icon: FaAddressBook,
    description: "The buttons under your intro.",
    label: "Contacts",
    kind: "list",
    fields: [
      text("title", "Label", { required: true }),
      { type: "select", name: "action", label: "Button does", options: contactActionOptions },
      text("href", "URL", { hint: "Any link: https://…, mailto:you@example.com, tel:+123…, https://wa.me/123…. Ignored for the résumé button." }),
      { type: "select", name: "icon", label: "Icon", options: contactIconOptions },
      { type: "select", name: "color", label: "Icon color", options: contactColorOptions },
    ],
  },
  {
    key: "experience",
    icon: FaBriefcase,
    description: "Your work history, newest first. Each job has projects, each project has bullet points.",
    label: "Experience",
    kind: "list",
    prepend: true,
    itemTitle: (item) => [item.role, item.company].filter(Boolean).join(" @ "),
    fields: [
      text("company", "Company", { required: true }),
      text("location", "Location"),
      text("role", "Role", { required: true }),
      text("startDate", "Start date", { required: true, ...DATE }),
      text("endDate", "End date", {
        required: true,
        pattern: /^(\d{4}-\d{2}-\d{2}|Present)$/,
        hint: 'YYYY-MM-DD, or "Present"',
      }),
      {
        type: "list",
        name: "projects",
        label: "Projects",
        titleKey: "name",
        fields: [
          text("name", "Project name"),
          area("about", "About the project"),
          {
            type: "list",
            name: "description",
            label: "Bullet points",
            titleKey: "description",
            fields: [area("description", "Bullet", { required: true, rows: 3 }), tags("highlightQuery", "Highlighted words", "Comma separated; words in the bullet to highlight")],
          },
        ],
      },
    ],
  },
  {
    key: "skills",
    icon: FaTools,
    description: "Skill categories and the skills inside them.",
    label: "Skills",
    kind: "list",
    fields: [
      text("label", "Category", { required: true }),
      { type: "select", name: "icon", label: "Category icon", options: iconOptions },
      { type: "select", name: "colorScheme", label: "Color", options: colorOptions },
      {
        type: "list",
        name: "items",
        label: "Skills",
        titleKey: "label",
        fields: [text("label", "Skill", { required: true }), { type: "select", name: "icon", label: "Icon", options: iconOptions }],
      },
    ],
  },
  { key: "projects", icon: FaProjectDiagram, description: "Portfolio projects, newest first. The home page shows the first three.", label: "Projects", kind: "list", prepend: true, fields: cardFields.projects },
  { key: "services", icon: FaConciergeBell, description: "What you offer to clients.", label: "Services", kind: "list", fields: cardFields.services },
  {
    key: "company",
    icon: FaRocket,
    description: "The New Venture card on the home page.",
    label: "New venture",
    kind: "object",
    fields: [
      text("name", "Name", { required: true }),
      text("link", "Link"),
      text("tagline", "Tagline"),
      text("status", "Status"),
      area("description", "Description"),
      tags("stack", "Tech stack"),
    ],
  },
  { key: "blogs", icon: FaPenNib, description: "Articles you have written.", label: "Blogs", kind: "list", prepend: true, fields: cardFields.blogs },
  { key: "packages", icon: FaNpm, description: "Published npm packages.", label: "Packages", kind: "list", prepend: true, fields: cardFields.packages },
  {
    key: "settings",
    icon: FaPalette,
    description: "Site-wide options.",
    label: "Settings",
    kind: "object",
    fields: [
      text("devName", "Developer name", { required: true, hint: "Shown in the intro, footer, page title and printed résumé." }),
      { ...tags("roles", "Developer roles", "Comma separated. They rotate under your name on the home page; the first is also the résumé title."), required: true },
      text("brandName", "Brand name", { required: true, hint: "The logo text in the site header, e.g. Majidev." }),
      {
        type: "select",
        name: "defaultTheme",
        label: "Default theme",
        options: ["dark", "light"],
        hint: "Applies to visitors who haven't used the theme toggle. Anyone who has keeps their own choice.",
      },
      {
        type: "image",
        name: "favicon",
        label: "Favicon",
        image: { size: 64, mime: "image/png" },
        hint: "Square works best. Shown in browser tabs. Remove it to use the built-in favicon (search engines and the installed app icon always use the files in /public).",
      },
    ],
  },
  {
    key: "resumes",
    icon: FaFileAlt,
    description: "Versions visitors choose from when they press the résumé button. Each prints from your latest site content, limited to the skills, jobs and projects you tick, or opens a file you link.",
    label: "Résumés",
    kind: "list",
    fields: [
      text("title", "Version name", { required: true, hint: "Shown to visitors, e.g. Frontend — React / Next.js" }),
      { type: "boolean", name: "print", label: "Print from site data (off: open the file below instead)", default: true },
      text("url", "Résumé file URL", { requiredWhen: (item) => item.print === false, hint: "A PDF or Google Drive link. Required when printing is off." }),
      text("role", "Title on the résumé", { hint: "Blank: the first role in Settings." }),
      area("summary", "Professional summary", { rows: 4, hint: 'Use "Y-M-D" where the total experience should go. Blank: the About paragraph.' }),
      choices(
        "skills",
        "Skills",
        (content) => content.skills.flatMap((category) => category.items.map((skill) => ({ value: skill.label, label: skill.label, group: category.label, hidden: isHidden(category, skill) }))),
        "None ticked: every skill."
      ),
      choices(
        "experience",
        "Work experience projects",
        (content) => content.experience.flatMap((job) => job.projects.filter((project) => project.name).map((project) => ({ value: project.name, label: project.name, group: `${job.role} @ ${job.company}`, hidden: isHidden(job, project) }))),
        "None ticked: every project. Every job is still listed; unticked projects are left out of it."
      ),
      choices(
        "projects",
        "Portfolio projects",
        (content) => content.projects.map((project) => ({ value: project.title, label: project.title, hidden: isHidden(project) })),
        'None ticked: the projects marked "Include in printed resume".'
      ),
    ],
  },
  {
    key: "github",
    icon: FaGithub,
    description: "Your GitHub profile: the README in your username/username repository and your profile details. Save here, then publish below.",
    label: "GitHub",
    kind: "object",
    fields: [
      { type: "boolean", name: "updateReadme", label: "Publish the profile README", default: true },
      choices("readmeSections", "README sections", () => README_SECTIONS, "None ticked: all of them. Filled from the other sections' saved content."),
      choices(
        "projects",
        "README projects",
        (content) => content.projects.map((project) => ({ value: project.title, label: project.title, hidden: isHidden(project) })),
        'None ticked: the projects marked "Include in printed resume".'
      ),
      { type: "boolean", name: "updateProfile", label: "Update the profile details below", default: true },
      text("name", "Name", { hint: "Blank: the developer name from Settings." }),
      text("company", "Company", { hint: "Start with @ to link a GitHub organization." }),
      area("bio", "Bio", {
        rows: 3,
        pattern: /^[\s\S]{0,158}$/,
        hint: 'Up to 158 characters (GitHub allows 160 once "Y-M-D" becomes e.g. 3Y 11M). "Y-M-D" stays current daily while the README is published too.',
      }),
      text("location", "Location"),
      text("blog", "Website"),
      { type: "boolean", name: "hireable", label: "Available for hire" },
    ],
  },
  {
    key: "education",
    icon: FaGraduationCap,
    description: "Degrees and schooling, newest first.",
    label: "Education",
    kind: "list",
    prepend: true,
    fields: [text("degree", "Degree", { required: true }), text("institution", "Institution", { required: true }), text("duration", "Duration", { hint: "e.g. Batch: 2018 - 2022" })],
  },
];

// Select options are plain strings or { value, label }.
export const optionValue = (option) => (typeof option === "string" ? option : option.value);
export const optionLabel = (option) => (typeof option === "string" ? option : option.label);

export function emptyValue(fields) {
  return Object.fromEntries(
    fields.map(({ type, name, options, default: fallback }) => [
      name,
      fallback ?? (type === "tags" || type === "list" || type === "choices" ? [] : type === "boolean" ? false : type === "select" ? optionValue(options[0]) : ""),
    ])
  );
}

// First problem found in `value`, as a message, or null. Walks nested lists.
export function findError(fields, value, path = "") {
  for (const field of fields) {
    const v = value[field.name];
    const where = `${path}${field.label}`;
    if (field.type === "list") {
      for (const [i, item] of (v ?? []).entries()) {
        const error = findError(field.fields, item, `${where} #${i + 1} → `);
        if (error) return error;
      }
    } else if ((field.required || field.requiredWhen?.(value)) && !String(v ?? "").trim()) {
      return `${where} is required`;
    } else if (field.pattern && v && !field.pattern.test(v)) {
      return `${where} must match: ${field.hint}`;
    }
  }
  return null;
}
