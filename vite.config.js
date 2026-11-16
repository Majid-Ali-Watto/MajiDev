/** @format */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: "autoUpdate", // Automatically updates service worker when a new version is available
			injectRegister: "auto", // Automatically injects the service worker registration
			devOptions: {
				enabled: true // Enable PWA in development mode for testing
			},
			workbox: {
				// The service worker answers page navigations with index.html (the SPA). Opening a file directly, e.g. a
				// project image in a new tab (/kharchafy.webp), robots.txt or sitemap.xml, must reach the file instead,
				// otherwise the router sends the unknown path to the home page.
				navigateFallbackDenylist: [/\/[^/?]+\.[a-z0-9]+(?:\?|$)/i],
				// /admin's code (Firebase SDK, editors) and its README preview renderer are only for the site owner: don't
				// make every visitor's service worker download them. /admin still loads them from the network when opened.
				globIgnores: ["**/AdminPage-*.js", "**/marked.esm-*.js"]
			},
			manifest: {
				name: "Majid Ali, Full Stack Web Developer",
				short_name: "Majidev.",
				description: "Portfolio of Majid Ali, Full Stack Web Developer and Senior Software Engineer (I) at AZM Development, Islamabad: Vue.js, Nuxt.js, React, Python/FastAPI, microservices and DevOps.",
				theme_color: "#0D9488",
				background_color: "#ffffff",
				display: "standalone",
				start_url: "/",
				icons: [
					{
						src: "/icon-192.png",
						sizes: "192x192",
						type: "image/png"
					},
					{
						src: "/icon-512.png",
						sizes: "512x512",
						type: "image/png"
					}
				]
			}
		})
	],
	optimizeDeps: {
		// firebase/auth is only imported by the lazy admin chunk; letting Vite discover it mid-session
		// re-optimizes deps and leaves two copies of @firebase/app ("Component auth has not been registered").
		include: ["firebase/app", "firebase/auth", "firebase/firestore"]
	},
	server: {
		watch: {
			usePolling: true // Keep this as per your existing configuration
		}
	}
});
