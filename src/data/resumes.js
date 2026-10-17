// Résumé versions offered when a visitor presses the résumé button (edited from /admin → Résumés).
// `skills`, `experience` (work-experience project names) and `projects` (portfolio project titles) pick what a printed version
// includes; empty means all (projects: those marked includeInResume). `print: false` opens `url` instead of printing.
// `role` and `summary` fall back to the first Settings role and the About paragraph; "Y-M-D" becomes the total experience.

const tooling = ["Git", "GitHub", "GitLab", "CI/CD"];
const frontendCore = ["JavaScript", "TypeScript", "HTML5", "CSS3", "Tailwind CSS", "Micro Frontend", "Vite", "Webpack"];
const react = ["React.js", "Next.js", "Redux Toolkit", "Zustand", "React Native", "Electron.js"];
const vue = ["Vue.js", "Nuxt", "Pinia", "Vuex"];
const node = ["Node.js", "Express.js"];
const python = ["Python", "FastAPI", "gRPC", "SQLAlchemy"];
const databases = ["PostgreSQL", "MySQL", "MSSQL", "MongoDB", "Elasticsearch", "Redis"];
const services = ["Micro Services", "JWT Auth", "Kafka", "Docker", "Kong API Gateway"];
const observability = ["Prometheus", "Grafana", "ELK Stack", "GitHub Actions", "Azure DevOps"];

const backendExperience = ["Tarekat Marketplace — Full Stack"];

export const resumes = [
  {
    title: "Full Stack",
    print: true,
    url: "",
    role: "Full Stack Web Developer",
    summary: "",
    skills: [],
    experience: [],
    projects: [],
  },
  {
    title: "Frontend",
    print: true,
    url: "",
    role: "Frontend Developer",
    summary:
      "Frontend Developer with Y-M-D of experience building end-to-end products with Vue.js, Nuxt.js, React, and TypeScript, including micro front-end architectures, shared component libraries, and server-side rendering.",
    skills: [...frontendCore, ...react, ...vue, "Chrome Extensions", ...tooling],
    experience: [],
    projects: [
      "Tarekat Marketplace",
      "Merath — Islamic Inheritance Platform",
      "Dockcrate — Docker & CI/CD Generator",
      "Kharchafy — Group Expense, Loans, and Personal Budget Hub",
      "API Mock Manager",
      "Mobile - Bandencentrale",
      "Linux GUI Command Helper App",
    ],
  },
  {
    title: "Frontend — React / Next.js",
    print: true,
    url: "",
    role: "Frontend Developer (React / Next.js)",
    summary: "Frontend Developer with Y-M-D of experience building web apps with React, Next.js, and TypeScript, from micro front-end architectures to desktop apps with Electron.js.",
    skills: [...frontendCore, ...react, ...tooling],
    experience: [],
    projects: ["Dockcrate — Docker & CI/CD Generator", "Mobile - Bandencentrale", "Linux GUI Command Helper App", "HTTP Status Codes Explorer", "World Countries", "Git Factory"],
  },
  {
    title: "Frontend — Vue / Nuxt",
    print: true,
    url: "",
    role: "Frontend Developer (Vue.js / Nuxt.js)",
    summary: "Frontend Developer with Y-M-D of experience building multi-tenant platforms with Vue.js, Nuxt.js, TypeScript, and Pinia, including server-side rendering and shared component libraries.",
    skills: [...frontendCore, ...vue, ...tooling],
    experience: [],
    projects: ["Tarekat Marketplace", "Merath — Islamic Inheritance Platform", "Kharchafy — Group Expense, Loans, and Personal Budget Hub", "API Mock Manager"],
  },
  {
    title: "Backend",
    print: true,
    url: "",
    role: "Backend Developer",
    summary:
      "Backend Developer with Y-M-D of experience building Python/FastAPI and Node.js microservices with gRPC and Kafka, backed by MSSQL and Redis, deployed with Docker and Kong API Gateway, and observed with Prometheus, Grafana, and the ELK Stack.",
    skills: [...node, ...python, ...databases, ...services, ...observability, ...tooling],
    experience: backendExperience,
    projects: ["Tarekat Marketplace", "Dockcrate — Docker & CI/CD Generator", "Docker Control Panel", "Kharchafy — Group Expense, Loans, and Personal Budget Hub", "User Management API"],
  },
  {
    title: "Backend — Node.js / Python",
    print: true,
    url: "",
    role: "Backend Developer (Node.js / Python)",
    summary: "Backend Developer with Y-M-D of experience building APIs and microservices with Node.js/Express and Python/FastAPI, using gRPC, Kafka, MSSQL, and Redis.",
    skills: [...node, ...python, ...databases, "Micro Services", "JWT Auth", "Kafka", "Docker", ...tooling],
    experience: backendExperience,
    projects: ["Tarekat Marketplace", "User Management API", "Kharchafy — Group Expense, Loans, and Personal Budget Hub", "Docker Control Panel"],
  },
];
