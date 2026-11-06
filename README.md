## Majid Ali, Full Stack Web Developer

## 🗂 Project Structure

```
src/
├── main.jsx                  # App entry point
├── App.jsx                   # Root component, lazy-loads all sections
├── style.css                 # Global styles
│
├── components/               # Section / page-level components
│   ├── Header.jsx
│   ├── Intro.jsx
│   ├── Stats.jsx
│   ├── Experience.jsx
│   ├── Skills.jsx
│   ├── Services.jsx
│   ├── Projects.jsx
│   ├── Blogs.jsx
│   ├── Packages.jsx
│   ├── Education.jsx
│   ├── Contact.jsx
│   ├── Footer.jsx
│   ├── Animate.jsx
│   ├── HireMe.jsx
│   ├── PrintResume.jsx
│   ├── Welcome.jsx
│   └── LazyRender.jsx        # Intersection-observer lazy wrapper
│
├── ui/                       # Reusable / generic UI primitives
│   ├── Accordion.jsx
│   ├── CardsList.jsx
│   ├── ErrorBoundary.jsx
│   ├── Helmet.jsx
│   └── SectionHeader.jsx
│
├── skeletons/                # Section-specific loading skeletons
│   ├── HeaderSkeleton.jsx
│   ├── IntroSkeleton.jsx
│   ├── StatsSkeleton.jsx
│   ├── TimelineSkeleton.jsx
│   ├── SkillsSkeleton.jsx
│   ├── CardGridSkeleton.jsx
│   ├── FooterSkeleton.jsx
│   └── index.js
│
├── hooks/                    # Custom React hooks
│   └── useFirebase.js
│
├── data/                     # Static JS data / constants
│   ├── generic-data.js
│   ├── nav-links.js
│   ├── contact-links.js
│   ├── experienceData.js
│   ├── educationData.js
│   ├── skills.js
│   ├── services.js
│   ├── project-links.js
│   ├── blogs.js
│   ├── packages.js
│   └── fadeInUpTransitionConfig.js
│
├── utils/                    # Pure utility functions
│   ├── getExpYears.js
│   ├── printResume.js
│   └── toLocaleDateString.js
│
└── config/                   # Third-party configuration
    └── firebaseConfig.js
```

## 🔐 Two-step sign-in (/admin)

`/admin` signs in with your password **and** a 6-digit code from an authenticator app (Google Authenticator, Microsoft
Authenticator, 1Password, Authy…). Firestore rules and the backend only accept a session that used the code, so a leaked
password alone can't change the site or publish to GitHub.

**One-time setup on the Firebase project** (in this order):

1. Firebase console → Authentication → Settings → **Upgrade to Firebase Authentication with Identity Platform**
   (the console shows its pricing before you confirm; a single admin account is far inside the free usage).
2. Turn on authenticator apps (TOTP). The console has no switch for it, so run this once, e.g. in Google Cloud Shell
   (replace `PROJECT_ID` with the site's `VITE_APP_PROJECT_ID`):
   ```bash
   curl -X PATCH "https://identitytoolkit.googleapis.com/admin/v2/projects/PROJECT_ID/config?updateMask=mfa" \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "X-Goog-User-Project: PROJECT_ID" \
     -H "Content-Type: application/json" \
     -d '{"mfa": {"providerConfigs": [{"state": "ENABLED", "totpProviderConfig": {"adjacentIntervals": 5}}]}}'
   ```
3. Deploy the site, open `/admin`, sign in, and follow **Set up two-step sign-in**: scan the QR code, enter a code, then
   sign in again with password + code. Save the setup key it shows in your password manager: it's how you add the
   account to a new phone.
4. Only now publish `firestore.rules` (Firebase console → Firestore → Rules) and deploy majidev-backend. Before step 3
   they would lock you out of saving, since no session of yours has used a code yet.

**Lost the phone and the setup key?** Remove the second factor with the Firebase Admin SDK
(`getAuth().updateUser(uid, { multiFactor: { enrolledFactors: null } })`), then set it up again.




### About Me
> Currently working as **Software Engineer (II) @[AZM Development](https://www.linkedin.com/company/azm-development/), Islamabad** since Sep 2025.<br><br>
- Currently deep-diving into **Micro Front-ends and Micro Services.**<br><br>
- Live portfolio: [https://majidev.netlify.app/](https://majidev.netlify.app/)<br><br>
- I write articles on [https://medium.com/@majid.teresol](https://medium.com/@majid.teresol)<br><br>
- Ask me about **React, Vue, Next.js, Nuxt.js, Node.**<br><br>
- Reach me at **majidaliqau@gmail.com**<br><br>

### Services
- Web Development
- Database Integration
- API Development

##
**Interested to work with me?**
[Hire Me on Upwork](https://www.upwork.com/freelancers/~018c214d3139f0f30e)

## 🌐 Socials:
[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/majid-ali-074b97245/) [![Medium](https://img.shields.io/badge/Medium-12100E?logo=medium&logoColor=white)](https://medium.com/@majid.teresol) [![GitHub](https://img.shields.io/badge/GitHub-%23121011.svg?logo=github&logoColor=white)](https://github.com/Majid-Ali-Watto)

# 💻 Tech Stack:
**Frontend:** ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Vue.js](https://img.shields.io/badge/vue.js-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D) ![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white) ![Nuxt.js](https://img.shields.io/badge/Nuxt.js-%2300C58E.svg?style=for-the-badge&logo=nuxtdotjs&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

**Backend:** ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi) ![gRPC](https://img.shields.io/badge/gRPC-%230078D7.svg?style=for-the-badge&logo=google&logoColor=white)

**Databases:** ![PostgreSQL](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white) ![MSSQLServer](https://img.shields.io/badge/Microsoft%20SQL%20Server-CC2927?style=for-the-badge&logo=microsoft%20sql%20server&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Elasticsearch](https://img.shields.io/badge/Elasticsearch-005571?style=for-the-badge&logo=elasticsearch&logoColor=white) ![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-D71F00?style=for-the-badge&logo=sqlalchemy&logoColor=white) ![Firebase](https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34) ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

**Infra & DevOps:** ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) ![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white) ![Kafka](https://img.shields.io/badge/Apache%20Kafka-000?style=for-the-badge&logo=apachekafka) ![Kong](https://img.shields.io/badge/Kong-%23003459.svg?style=for-the-badge&logo=kong&logoColor=white) ![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=Prometheus&logoColor=white) ![Grafana](https://img.shields.io/badge/grafana-%23F46800.svg?style=for-the-badge&logo=grafana&logoColor=white) ![ELK Stack](https://img.shields.io/badge/ELK%20Stack-005571?style=for-the-badge&logo=elasticsearch&logoColor=white) ![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white) ![Azure DevOps](https://img.shields.io/badge/Azure%20DevOps-%230078D7.svg?style=for-the-badge&logo=azuredevops&logoColor=white)
# 📊 GitHub Stats
![](https://github-readme-stats.vercel.app/api?username=Majid-Ali-Watto&theme=dark&hide_border=false&include_all_commits=true&count_private=true)<br/>

![](https://github-readme-stats.vercel.app/api/top-langs/?username=Majid-Ali-Watto&theme=dark&hide_border=false&include_all_commits=true&count_private=true&layout=compact)
