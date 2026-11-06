import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import useContent from "../hooks/useContent";
import { siteUrl } from "../data/generic-data";

function Helmet_SEO({ heading = "Full Stack Developer" }) {
  const { devName, brandName } = useContent("settings");
  const brandKeyword = brandName.replace(/[.\s]+$/, ""); // "Majidev." -> "Majidev"
  const { pathname } = useLocation();
  // Always the public address, so a deploy preview or another domain never claims to be the original page.
  // The Person structured data lives once, in index.html, where crawlers that don't run scripts see it too.
  const currentUrl = `${siteUrl}${pathname}`;

  return (
      <Helmet>
        <title>{`${devName} - ${heading}`}</title>
        <meta
          name="description"
          content={`${devName} — Full Stack Web Developer specializing in Vue.js, Nuxt.js, React, TypeScript, Python/FastAPI microservices, gRPC, Kafka, Docker, and DevOps. Explore projects and services.`}
        />
        <meta
          name="keywords"
          content={`${brandKeyword}, ${devName}, Full Stack Web Developer, Vue.js, Nuxt.js, React, TypeScript, Python, FastAPI, gRPC, Kafka, MSSQL, Redis, Docker, Elasticsearch, Microservices, DevOps, Software Engineer, Portfolio, Islamabad`}
        />
        <meta name="author" content={devName} />
        <link rel="canonical" href={currentUrl} />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={`${devName} — Full Stack Developer`} />
        <meta
          property="og:description"
          content={`${devName} — Full Stack Web Developer specializing in Vue.js, Nuxt.js, React, TypeScript, Python/FastAPI microservices, gRPC, Kafka, Docker, and DevOps.`}
        />
        <meta property="og:image" content={`${siteUrl}/majid2.webp`} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={brandName} />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${devName} — Full Stack Developer`} />
        <meta
          name="twitter:description"
          content={`${devName} — Full Stack Web Developer specializing in Vue.js, Nuxt.js, React, TypeScript, Python/FastAPI microservices, gRPC, Kafka, Docker, and DevOps.`}
        />
        <meta name="twitter:image" content={`${siteUrl}/majid2.webp`} />

      </Helmet>
  );
}

Helmet_SEO.propTypes = {
  heading: PropTypes.string,
};

export default Helmet_SEO;
