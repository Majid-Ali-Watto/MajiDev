import { HelmetProvider, Helmet } from "react-helmet-async";

function Helemt_SEO() {
	const devName = import.meta.env.VITE_APP_DEV_NAME || "Majid Ali";

	return (
		<HelmetProvider>
			<Helmet>
				<title>{`${devName} - Portfolio`}</title>
				<meta name="description" content={`Welcome to ${devName}'s portfolio. Explore projects, services, and more.`} />
				<meta name="keywords" content={`${devName}'s portfolio, ${devName}, Vue JS Developer, React JS Developer, Front End Developer, Portfolio, Web Developer, Software Engineer, Projects, Services`} />
				<meta name="author" content={devName} />

				{/* Open Graph Meta Tags */}
				<meta property="og:title" content={`${devName} - Portfolio`} />
				<meta property="og:description" content={`Welcome to ${devName}'s portfolio. Explore projects, services, and more.`} />
				<meta
					property="og:image"
					content="/soft-dev.webp" // Ensure the image is located in the public directory
				/>
				<meta property="og:url" content={window.location.origin} />
				<meta property="og:type" content="website" />

				{/* Twitter Card Meta Tags */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content={`${devName} - Portfolio`} />
				<meta name="twitter:description" content={`Welcome to ${devName}'s portfolio. Explore projects, services, and more.`} />
				<meta
					name="twitter:image"
					content="/soft-dev.webp" // Ensure the image is located in the public directory
				/>
			</Helmet>
		</HelmetProvider>
	);
}

export default Helemt_SEO;
