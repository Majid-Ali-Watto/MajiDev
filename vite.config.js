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
			manifest: {
				name: "Majid Ali, Full Stack Web Developer",
				short_name: "Majidev.",
				description: "Hi 👋, I'm Pakistan based **Full Stack Web Developer** skilled in both front-end and back-end technologies. Freelancer & **Full Stack Developer @[Teresol](https://www.linkedin.com/company/teresolpvtltd/mycompany/) Pvt Ltd, Islamabad** since Oct 2022.",
				theme_color: "#0D9488",
				background_color: "#ffffff",
				display: "standalone",
				start_url: "/",
				icons: [
					{
						src: "/majid2.webp", // You should place these icons in the public folder
						sizes: "256x256",
						type: "image/webp"
					},
					{
						src: "/soft-dev.png",
						sizes: "512x512",
						type: "image/png"
					}
				]
			}
		})
	],
	server: {
		watch: {
			usePolling: true // Keep this as per your existing configuration
		}
	}
});
