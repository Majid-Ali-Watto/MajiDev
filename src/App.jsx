import { lazy } from "react";
const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));
const Header = lazy(() => import("./components/Header"));
const MyIntro = lazy(() => import("./components/Intro"));
const Projects = lazy(() => import("./components/Projects"));
const Services = lazy(() => import("./components/Services"));
const Packages = lazy(() => import("./components/Packages"));
const Blogs = lazy(() => import("./components/Blogs"));
const Education = lazy(() => import("./components/Education"));
const Footer = lazy(() => import("./components/Footer"));
const Skills = lazy(() => import("./components/Skills"));
import { Divider, Stack } from "@chakra-ui/react";
import { motion, useScroll, useSpring } from "framer-motion";
import Helemt_SEO from "./generic-components/Helemt";

const devName = import.meta.env.VITE_APP_DEV_NAME || "Majid Ali";

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
			<div>
				<Helemt_SEO />
				<Header />

				<Stack className="mainBody">
					<MyIntro
						devName={devName}
						Contact={Contact}
					/>
					<Divider orientation="horizontal" />
					<About />
					<Divider orientation="horizontal" />
					<Skills />
					<Divider orientation="horizontal" />
					<Services />
					<Divider orientation="horizontal" />
					<Projects />
					<Divider orientation="horizontal" />
					<Blogs />
					<Divider orientation="horizontal" />
					<Packages />
					<Divider orientation="horizontal" />
					<Education />
					<Divider orientation="horizontal" />
					<Footer owner={devName} />
				</Stack>
			</div>
		</>
	);
}

export default App;
