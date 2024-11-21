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
import LazyRender from "./LazyRender";
const devName = import.meta.env.VITE_APP_DEV_NAME || "Majid Ali";

function App() {
	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 30,
		restDelta: 0.001
	});

	return (
		<>
			{/* Progress Bar */}
			<motion.div style={{ scaleX }} className="progress-bar"></motion.div>

			{/* Main Content */}
			<div>
				<Helemt_SEO />
				<Header />

				<Stack className="mainBody">
					<LazyRender>
						<MyIntro devName={devName} Contact={Contact} />
					</LazyRender>
					<Divider orientation="horizontal" />

					<LazyRender>
						<About />
					</LazyRender>
					<Divider orientation="horizontal" />

					<LazyRender>
						<Skills />
					</LazyRender>
					<Divider orientation="horizontal" />

					<LazyRender>
						<Services />
					</LazyRender>
					<Divider orientation="horizontal" />

					<LazyRender>
						<Projects />
					</LazyRender>
					<Divider orientation="horizontal" />

					<LazyRender>
						<Blogs />
					</LazyRender>
					<Divider orientation="horizontal" />

					<LazyRender>
						<Packages />
					</LazyRender>
					<Divider orientation="horizontal" />

					<LazyRender>
						<Education />
					</LazyRender>
					<Divider orientation="horizontal" />

					<LazyRender>
						<Footer owner={devName} />
					</LazyRender>
				</Stack>
			</div>
		</>
	);
}

export default App;
