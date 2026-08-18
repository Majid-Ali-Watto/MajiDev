const commonStack = ["React.js", "HTML", "CSS", "JavaScript"];
export const projects = [
  {
    title: "Tarekat Marketplace",
    link: "https://marketplace-qa.azm-dev.com/",
    gLink: null,
    imgURL: "/tarekat.webp",
    description:
      "Multi-tenant service marketplace built end-to-end — Vue.js/Nuxt.js/TypeScript frontend with SSR and Elasticsearch search, backed by Python/FastAPI microservices communicating over gRPC and Kafka, MSSQL + SQLAlchemy, Redis caching, Kong API Gateway, and full observability via Prometheus, Grafana, and ELK Stack.",
    stack: ["Vue.js", "Nuxt.js", "TypeScript", "Pinia", "Python", "FastAPI", "gRPC", "Kafka", "MSSQL", "Redis", "Kong", "Docker", "ELK Stack"],
    includeInResume: true,
  },
  {
    title: "Merath — Islamic Inheritance Platform",
    link: "https://ops-merath.web.azm-dev.com/",
    gLink: null,
    imgURL: "/merath.webp",
    description:
      "A comprehensive Islamic inheritance distribution platform for Saudi Arabia under the supervision of the Ministry of Justice. Enables heirs to submit requests, track distribution status, and manage legal documentation — automating the full inheritance workflow from heir identification through estate inventory to final distribution.",
    stack: ["Vue.js", "Pinia", "TypeScript", "Nuxt.js"],
    includeInResume: true,
  },
  {
    title: "Flow Recorder",
    link: null,
    gLink: "https://github.com/Majid-Ali-Watto/flow-recorder-fe-and-apis",
    imgURL: "/flow-recorder.webp",
    description:
      "A Chrome extension that records API network traffic and frontend user interactions — with optional screenshots and video — and lets you view, search, filter, and export the results.",
    stack: [...commonStack.slice(1)],
    includeInResume: true,
  },
  {
    title: "API Mock Manager",
    link: null,
    gLink: "https://github.com/Majid-Ali-Watto/api-mock-manager-extension",
    imgURL: "/api-mock-manager.webp",
    description:
      "A Chrome Manifest V3 extension for mocking API responses directly in the browser. It is built for frontend development, testing, and debugging when the real backend is unavailable, unstable, or not ready yet.",
    stack: [...commonStack.slice(1), "Vue.js", "IndexedDB"],
    includeInResume: true,

  },
  {
    title: "Docker Control Panel",
    link: null,
    gLink: "https://github.com/Majid-Ali-Watto/docker-control-panel-linux",
    imgURL: "/docker-control-panel.webp",
    description:
      "A graphical Docker manager for Linux — control containers, images, volumes, networks, Compose projects, and live stats without typing docker commands.",
    stack: ["Python", "PyQt5", "Docker", "Shell"],
    includeInResume: true,

  },
  {
    title: "Kharchafy — Group Expense, Loans, and Personal Budget Hub",
    link: "https://g-exp-trk.netlify.app/",
    gLink: "https://github.com/Majid-Ali-Watto/group-expense-tracker",
    imgURL: "/kharchafy.webp",
    description:
      "Kharchafy is a Vue 3 + Pinia single-page app for running small-group or household finances. It keeps shared expenses, shared loans, personal loans, and personal salary budgets in one place, backed by Cloud Firestore and Cloudinary for receipt storage. Every sensitive change flows through member approvals, so nothing destructive happens without consensus.",
    stack: [
      ...commonStack.slice(1),
      "Vue.js",
      "Pinia",
      "Cloud Firestore",
      "Cloudinary",
      "Node.js",
      "Express.js",
    ],
    includeInResume: true,
  },
  {
    title: "Linux GUI Command Helper App",
    link: null,
    gLink: "https://github.com/Majid-Ali-Watto/office-helper-react-vite-electron",
    imgURL: "/linux-gui-helper.svg",
    description:
      "This project is a React-based GUI application designed to run on Linux systems. It serves as a convenient interface for managing system commands, folder operations, Git repositories, and NPM configurations.",
    stack: [...commonStack, "Electron.js", "Node.js"],
    includeInResume: true,

  },
  {
    title: "Mobile - Bandencentrale",
    link: "https://plattebandauto.be/",
    gLink: "https://github.com/Majid-Ali-Watto/Mobile-Bandencentrale.git",
    imgURL: "/mobile-banden.webp",
    description:
      "This web app uses Google Maps, Email and WhatsApp Services to order tyres and vehicle related services in Belgium.",
    stack: [
      ...commonStack,
      "TailwindCss",
      "Yup",
      "Formik",
      "Google Maps",
      "EmailJS",
    ],
    includeInResume: true,
  },
  {
    title: "World Countries",
    link: "https://worldcountrieslist.netlify.app/",
    gLink: "https://github.com/Majid-Ali-Watto/world-countries.git",
    imgURL: "/countries.webp",
    description: "List of countries with major data.",
    stack: [...commonStack],
  },

  {
    title: "Git Factory",
    link: "https://git-factory.netlify.app/",
    gLink: "https://github.com/Majid-Ali-Watto/Git-factory.git",
    imgURL: "/git-commands.webp",
    description:
      "This web app has basic Git commands at one place, easy to remember and use.",
    stack: [...commonStack],
  },

  {
    title: "Blogs",
    link: "https://basic-blog-app.netlify.app/",
    gLink: "https://github.com/Majid-Ali-Watto/Basic-Blogs.git",
    imgURL: "/blogs.webp",
    description:
      "This web app is developed for showing diffrent articles of different Indonesian topics.",
    stack: [...commonStack.slice(0, 3), "TypeScript"],
  },

  {
    title: "Images Gallery",
    link: "https://picsforu.netlify.app/",
    gLink: "https://github.com/Majid-Ali-Watto/Loader-PicsAPI.git",
    imgURL: "/picsforu.webp",
    description:
      "Pictures are fetched from picsum, being displayed as Gallery, user can download them.",
    stack: [...commonStack].slice(1),
  },

  {
    title: "User Management API",
    link: "https://fake-user-api.up.railway.app/api/v1/users",
    gLink: "https://github.com/Majid-Ali-Watto/fake-user-api",
    imgURL: "/user-api.webp",
    description:
      "This is a User Management API that allows you to manage users with CRUD operations. You can create, read, update, and delete users through the various endpoints provided.",
    stack: ["Node.js", "Express.js", "Javascript"],
  },
  {
    title: "HTTP Status Codes Explorer",
    link: "https://httpstatuscodesexplorer.vercel.app/",
    gLink: "https://github.com/Majid-Ali-Watto/http-status-codes-explorer",
    imgURL: "/http.webp",
    description:
      "An interactive web application for exploring HTTP status codes, their meanings, descriptions, and examples.",
    stack: ["Next.js", "TailwindCss.js", "TypeScript"],
  },
];
// [("Hostel Activity Monitor React Native App", "Hostel Activity Monitor Web App", "Private Chat App")];
