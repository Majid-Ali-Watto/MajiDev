/** @format */

import "../src/style.css";
import { lazy } from "react";
const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));
const Header = lazy(() => import("./components/Header"));
const MyIntro = lazy(() => import("./components/Intro"));
const Projects = lazy(() => import("./components/Projects"));
const Services = lazy(() => import("./components/Services"));
const Packages = lazy(() => import("./components/Packages"));
const Blogs = lazy(() => import("./components/Blogs"));

import { Helmet } from "react-helmet";
import { Divider, Stack } from "@chakra-ui/react";
import { motion, useScroll, useSpring } from "framer-motion";

const devName = import.meta.env.VITE_APP_DEV_NAME;

function App() {
	// Scroll progress hook from Framer Motion
	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 30,
		restDelta: 0.001
	});

	return (
		<>
			{/* Progress Bar */}
			<motion.div
				style={{ scaleX }}
				className="progress-bar"></motion.div>

			{/* Main Content */}
			<div className="hero-image hero-text">
				<Helmet>
					<title>{devName ? `${devName} - Portfolio` : "Portfolio"}</title>
					<meta
						name="description"
						content={`Welcome to Majid Ali's portfolio. Explore projects, services, and more.`}
					/>
					<meta
						name="keywords"
						content="Majid Ali's portfolio,Majid Ali,Vue JS Developer, React JS Developer, Front End Developer, Portfolio, Web Developer, Software Engineer, Projects, Services"
					/>
					<meta
						name="author"
						content={devName}
					/>

					{/* Open Graph Meta Tags */}
					<meta
						property="og:title"
						content={"Majid Ali - Portfolio"}
					/>
					<meta
						property="og:description"
						content={`Welcome to Majid Ali's portfolio. Explore projects, services, and more.`}
					/>
					<meta
						property="og:image"
						content="/public/soft-dev.png"
					/>
					<meta
						property="og:url"
						content={window.location.href}
					/>
					<meta
						property="og:type"
						content="website"
					/>

					{/* Twitter Card Meta Tags */}
					<meta
						name="twitter:card"
						content="summary_large_image"
					/>
					<meta
						name="twitter:title"
						content="Majid Ali - Portfolio"
					/>
					<meta
						name="twitter:description"
						content={`Welcome to Majid Ali's portfolio. Explore projects, services, and more.`}
					/>
					<meta
						name="twitter:image"
						content="/public/soft-dev.png"
					/>
				</Helmet>
				<div className="header-area">
					<Header />
				</div>
				<MyIntro
					devName={devName}
					Contact={Contact}
				/>
				<Divider orientation="horizontal" />
				<Stack className="mainBody">
					<About />
					<Divider orientation="horizontal" />
					<Services />
					<Divider orientation="horizontal" />
					<Projects />
					<Divider orientation="horizontal" />
					<Blogs />
					<Divider orientation="horizontal" />
					<Packages />
				</Stack>
			</div>
		</>
	);
}

export default App;
