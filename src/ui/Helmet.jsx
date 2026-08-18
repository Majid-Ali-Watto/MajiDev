import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";
import { devFullName, devGithub, devPortfolio, devEmail, devLocation } from "../data/generic-data";

function Helmet_SEO({ heading = "Full Stack Developer" }) {
  const devName = devFullName || "Majid Ali";
  const currentUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://majidev.netlify.app";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: devName,
    url: currentUrl,
    email: devEmail,
    jobTitle: "Full Stack Web Developer",
    address: { "@type": "PostalAddress", addressLocality: devLocation },
    sameAs: [devPortfolio, devGithub],
    knowsAbout: ["Vue.js", "Nuxt.js", "React", "TypeScript", "Python", "FastAPI", "gRPC", "Kafka", "MSSQL", "Redis", "Docker", "Elasticsearch", "Microservices", "DevOps"],
  };

  return (
      <Helmet>
        <title>{`${devName} - ${heading}`}</title>
        <meta
          name="description"
          content={`${devName} — Full Stack Web Developer specializing in Vue.js, Nuxt.js, React, TypeScript, Python/FastAPI microservices, gRPC, Kafka, Docker, and DevOps. Explore projects and services.`}
        />
        <meta
          name="keywords"
          content={`${devName}, Full Stack Web Developer, Vue.js, Nuxt.js, React, TypeScript, Python, FastAPI, gRPC, Kafka, MSSQL, Redis, Docker, Elasticsearch, Microservices, DevOps, Software Engineer, Portfolio, Islamabad`}
        />
        <meta name="author" content={devName} />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={`${devName} — Full Stack Developer`} />
        <meta
          property="og:description"
          content={`${devName} — Full Stack Web Developer specializing in Vue.js, Nuxt.js, React, TypeScript, Python/FastAPI microservices, gRPC, Kafka, Docker, and DevOps.`}
        />
        <meta property="og:image" content="/majid2.webp" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={`${devName}'s Portfolio`} />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${devName} — Full Stack Developer`} />
        <meta
          name="twitter:description"
          content={`${devName} — Full Stack Web Developer specializing in Vue.js, Nuxt.js, React, TypeScript, Python/FastAPI microservices, gRPC, Kafka, Docker, and DevOps.`}
        />
        <meta name="twitter:image" content="/majid2.webp" />

        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
  );
}

Helmet_SEO.propTypes = {
  heading: PropTypes.string,
};

export default Helmet_SEO;
