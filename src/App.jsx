import { lazy, Suspense } from "react";
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
				<Suspense fallback={<div>Loading Header...</div>}>
					<Header />
				</Suspense>

				<Stack className="mainBody">
					<Suspense fallback={<div>Loading My Intro...</div>}>
						<LazyRender>
							<MyIntro devName={devName} Contact={Contact} />
						</LazyRender>
					</Suspense>
					<Divider  orientation="horizontal" />

					<Suspense fallback={<div>Loading About...</div>}>
						<LazyRender>
							<About />
						</LazyRender>
					</Suspense>
					<Divider orientation="horizontal" />

					<Suspense fallback={<div>Loading Skills...</div>}>
						<LazyRender>
							<Skills />
						</LazyRender>
					</Suspense>
					<Divider orientation="horizontal" />

					<Suspense fallback={<div>Loading Services...</div>}>
						<LazyRender>
							<Services />
						</LazyRender>
					</Suspense>
					<Divider orientation="horizontal" />

					<Suspense fallback={<div>Loading Projects...</div>}>
						<LazyRender>
							<Projects />
						</LazyRender>
					</Suspense>
					<Divider orientation="horizontal" />

					<Suspense fallback={<div>Loading Blogs...</div>}>
						<LazyRender>
							<Blogs />
						</LazyRender>
					</Suspense>
					<Divider orientation="horizontal" />

					<Suspense fallback={<div>Loading Packages...</div>}>
						<LazyRender>
							<Packages />
						</LazyRender>
					</Suspense>
					<Divider orientation="horizontal" />

					<Suspense fallback={<div>Loading Education...</div>}>
						<LazyRender>
							<Education />
						</LazyRender>
					</Suspense>
					<Divider orientation="horizontal" />

					<Suspense fallback={<div>Loading Contact and Developer Name...</div>}>
						<LazyRender>
							<Contact />
							<Footer owner={devName} />
						</LazyRender>
					</Suspense>
				</Stack>
			</div>
		</>
	);
}

export default App;
