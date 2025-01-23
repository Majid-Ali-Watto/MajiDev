// import { lazy, Suspense } from "react";
// const About = lazy(() => import("./components/About"));
// const Contact = lazy(() => import("./components/Contact"));
// const Header = lazy(() => import("./components/Header"));
// const MyIntro = lazy(() => import("./components/Intro"));
// const Projects = lazy(() => import("./components/Projects"));
// const Services = lazy(() => import("./components/Services"));
// const Packages = lazy(() => import("./components/Packages"));
// const Blogs = lazy(() => import("./components/Blogs"));
// const Education = lazy(() => import("./components/Education"));
// const Footer = lazy(() => import("./components/Footer"));
// const Skills = lazy(() => import("./components/Skills"));
// import { Divider, Stack } from "@chakra-ui/react";
// import { motion, useScroll, useSpring } from "framer-motion";
// import Helemt_SEO from "./generic-components/Helemt";
// import LazyRender from "./LazyRender";
// import useFirebase from "./hooks/useFireBase";
// import { contactLinks } from "./assets/contact-links";
// const devName = import.meta.env.VITE_APP_DEV_NAME || "Majid Ali";

// function App() {
// 	const { scrollYProgress } = useScroll();
// 	const scaleX = useSpring(scrollYProgress, {
// 		stiffness: 100,
// 		damping: 30,
// 		restDelta: 0.001
// 	});
// 	const { isLoading, uploads } = useFirebase();
// 	console.log("🚀 -> file: App.jsx:28 -> App -> isLoading, uploads:", isLoading, uploads);
// 	contactLinks[6].href = uploads[0]?.resumeLink || import.meta.env.VITE_APP_RESUME_LINK
// 	return (
// 		<>
// 			{/* Progress Bar */}
// 			<motion.div style={{ scaleX }} className="progress-bar"></motion.div>

// 			{/* Main Content */}
// 			<div>
// 				<Helemt_SEO />
// 				<Suspense fallback={<div>Loading Header...</div>}>
// 					<Header />
// 				</Suspense>

// 				<Stack className="mainBody">
// 					<Suspense fallback={<div>Loading My Intro...</div>}>
// 						<LazyRender>
// 							<MyIntro image={uploads[0]?.imageBase64} devName={devName} Contact={Contact} />
// 						</LazyRender>
// 					</Suspense>
// 					<Divider orientation="horizontal" />
// 					<Suspense fallback={<div>Loading About...</div>}>
// 						<LazyRender>
// 							<About about={uploads[0]?.paragraph} />
// 						</LazyRender>
// 					</Suspense>
// 					<Divider orientation="horizontal" />

// 					<Suspense fallback={<div>Loading Skills...</div>}>
// 						<LazyRender>
// 							<Skills />
// 						</LazyRender>
// 					</Suspense>
// 					<Divider orientation="horizontal" />

// 					<Suspense fallback={<div>Loading Services...</div>}>
// 						<LazyRender>
// 							<Services />
// 						</LazyRender>
// 					</Suspense>
// 					<Divider orientation="horizontal" />

// 					<Suspense fallback={<div>Loading Projects...</div>}>
// 						<LazyRender>
// 							<Projects />
// 						</LazyRender>
// 					</Suspense>
// 					<Divider orientation="horizontal" />

// 					<Suspense fallback={<div>Loading Blogs...</div>}>
// 						<LazyRender>
// 							<Blogs />
// 						</LazyRender>
// 					</Suspense>
// 					<Divider orientation="horizontal" />

// 					<Suspense fallback={<div>Loading Packages...</div>}>
// 						<LazyRender>
// 							<Packages />
// 						</LazyRender>
// 					</Suspense>
// 					<Divider orientation="horizontal" />

// 					<Suspense fallback={<div>Loading Education...</div>}>
// 						<LazyRender>
// 							<Education />
// 						</LazyRender>
// 					</Suspense>
// 					<Divider orientation="horizontal" />

// 					<Suspense fallback={<div>Loading Contact and Developer Name...</div>}>
// 						<LazyRender>
// 							<Contact />
// 							<Footer owner={devName} />
// 						</LazyRender>
// 					</Suspense>
// 				</Stack>
// 			</div>
// 		</>
// 	);
// }

// export default App;

import { lazy, Suspense } from "react";
import { Progress, Divider, Stack } from "@chakra-ui/react";
import Helemt_SEO from "./generic-components/Helemt";
import LazyRender from "./LazyRender";
import useFirebase from "./hooks/useFireBase";
import { contactLinks } from "./assets/contact-links";

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
const Experience = lazy(() => import("./components/Experience"));

const devName = import.meta.env.VITE_APP_DEV_NAME || "Majid Ali";

function App() {
	const { isLoading, uploads } = useFirebase();
	contactLinks[6].href = uploads[0]?.resumeLink || import.meta.env.VITE_APP_RESUME_LINK;

	const ProgressFallback = <Progress size="xs" colorScheme="teal" isIndeterminate />;

	return (
		<>
			<Helemt_SEO />
			<Suspense fallback={ProgressFallback}>
				<Header />
			</Suspense>

			<Stack className="mainBody">
				<Suspense fallback={ProgressFallback}>
					<LazyRender>
						<MyIntro image={uploads[0]?.imageBase64} devName={devName} Contact={Contact} />
					</LazyRender>
				</Suspense>
				<Divider orientation="horizontal" />
				<Suspense fallback={ProgressFallback}>
					<LazyRender>
						<About about={uploads[0]?.paragraph} />
					</LazyRender>
				</Suspense>
				{/* <Divider orientation="horizontal" /> */}
				<Suspense fallback={ProgressFallback}>
					<LazyRender>
						<Experience />
					</LazyRender>
				</Suspense>

				<Divider orientation="horizontal" />

				<Suspense fallback={ProgressFallback}>
					<LazyRender>
						<Skills />
					</LazyRender>
				</Suspense>
				<Divider orientation="horizontal" />

				<Suspense fallback={ProgressFallback}>
					<LazyRender>
						<Services />
					</LazyRender>
				</Suspense>
				<Divider orientation="horizontal" />

				<Suspense fallback={ProgressFallback}>
					<LazyRender>
						<Projects />
					</LazyRender>
				</Suspense>
				<Divider orientation="horizontal" />

				<Suspense fallback={ProgressFallback}>
					<LazyRender>
						<Blogs />
					</LazyRender>
				</Suspense>
				<Divider orientation="horizontal" />

				<Suspense fallback={ProgressFallback}>
					<LazyRender>
						<Packages />
					</LazyRender>
				</Suspense>
				<Divider orientation="horizontal" />

				<Suspense fallback={ProgressFallback}>
					<LazyRender>
						<Education />
					</LazyRender>
				</Suspense>
				<Divider orientation="horizontal" />

				<Suspense fallback={ProgressFallback}>
					<LazyRender>
						<Contact />
						<br />
						<Footer owner={devName} />
					</LazyRender>
				</Suspense>
			</Stack>
		</>
	);
}

export default App;
