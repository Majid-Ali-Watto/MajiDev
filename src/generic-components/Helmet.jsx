import { HelmetProvider, Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

function Helmet_SEO({ heading = "Full Stack Developer" }) {
	const devName = import.meta.env.VITE_APP_DEV_NAME || "Majid Ali";
	const currentUrl = typeof window !== "undefined" ? window.location.origin : "https://majidev.netlify.app";

	return (
		<HelmetProvider>
			<Helmet>
				<title>{`${devName} - ${heading}`}</title>
				<meta name="description" content={`Welcome to ${devName}'s portfolio. Explore projects, services, and more.`} />
				<meta name="keywords" content={`${devName}'s portfolio, ${devName}, Vue JS Developer, React JS Developer, Front End Developer, Portfolio, Web Developer, Software Engineer, Projects, Services`} />
				<meta name="author" content={devName} />

				{/* Open Graph Meta Tags */}
				<meta property="og:title" content={`${devName} - Portfolio`} />
				<meta property="og:description" content={`Welcome to ${devName}'s portfolio. Explore projects, services, and more.`} />
				<meta property="og:image" content="/majid2.webp" />
				<meta property="og:url" content={currentUrl} />
				<meta property="og:type" content="website" />
				<meta property="og:site_name" content={`${devName}'s Portfolio`} />
				<meta property="og:locale" content="en_US" />

				{/* Twitter Card Meta Tags */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content={`${devName} - Portfolio`} />
				<meta name="twitter:description" content={`Welcome to ${devName}'s portfolio. Explore projects, services, and more.`} />
				<meta name="twitter:image" content="/majid2.webp" />
			</Helmet>
		</HelmetProvider>
	);
}

Helmet_SEO.propTypes = {
	heading: PropTypes.string
};

export default Helmet_SEO;
