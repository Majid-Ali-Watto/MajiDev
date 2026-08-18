import { hireMeLink } from "./generic-data";

const link = hireMeLink;
export const services = [
  {
    title: "Full Stack Web Development",
    imgURL: "/web-dev.webp",
    link,
    description:
      "End-to-end web applications using Vue.js, Nuxt.js (SSR), React, and TypeScript on the frontend — paired with Python/FastAPI backends and full CI/CD pipeline setup.",
  },
  {
    title: "API & Microservices",
    imgURL: "/api.webp",
    link,
    description:
      "Design and build RESTful and gRPC microservices with Python/FastAPI. Event-driven architecture with Apache Kafka, API gateway management with Kong, and Redis caching layers.",
  },
  {
    title: "Database & Infrastructure",
    imgURL: "/database.webp",
    link,
    description:
      "Database design and optimization with MSSQL, SQLAlchemy ORM, Redis, and Elasticsearch. Infrastructure setup with Docker, Prometheus, Grafana, and ELK Stack for full observability.",
  },
];
