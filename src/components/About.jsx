/** @format */

import { Heading, Stack, Text, Highlight, Box } from "@chakra-ui/react";
import "../style.css";
import Skills from "./Skills";
import { Element } from "react-scroll";

function About() {
	return (
		<Element
			id="about"
			className="about">
			<Box
				textAlign="center"
				mb="8">
				<Heading
					as="h2"
					size="2xl"
					color="var(--primaryColor)"
					mb="4">
					About Me
				</Heading>
			</Box>
			<Stack
				spacing="6"
				mx="auto"
				px="4">
				<Text
					fontSize="lg"
					color="gray.700">
					<Highlight
						query={["Full Stack Web Developer", "Vue.js Developer @Teresol"]}
						styles={{ px: "2", color: "blue.500" }}>
						Hi, I&apos;m a Pakistan-based Full Stack Web Developer skilled in both front-end and back-end technologies. Freelancer & Vue.js Developer @Teresol since Oct 2022. Let&apos;s create something amazing together!
					</Highlight>
				</Text>
				<Box
					textAlign="center"
					mb="6">
					<Heading
						as="h3"
						size="lg"
						color="#757575">
						My Skill-Set
					</Heading>
				</Box>
				<Skills />
				{/* Uncomment when ready to include the HireMe component */}
				{/* <HireMe /> */}
			</Stack>
		</Element>
	);
}

export default About;


// import { Helmet } from "react-helmet";

// 	<Helmet>
// 		<title>Majid Ali || Vue JS Developer || React JS Developer|| Front-End Developer || Full Stack Web Developer || Full Stack Developer</title>

// 		<meta
// 			name="description"
// 			content="Learn more about me, a Full Stack Web Developer from Pakistan with expertise in front-end and back-end technologies. Majid Ali's personal website. Explore his projects, portfolio, and get in touch with him for collaborations or inquiries."
// 		/>
// 		<meta
// 			name="keywords"
// 			content="Full Stack Web Developer, Vue.js Developer, Web Development, Freelancer, Majid Ali, Majid, Vue JS Developer, React JS Developer, Web Developer, Software Engineer, Portfolio, Front End Developer, Front-End Developer, Full Stack Web Developer"
// 		/>
// 		<meta
// 			name="author"
// 			content="Majid Ali"
// 		/>

// 		<meta
// 			property="og:title"
// 			content="Majid Ali - Personal Website"
// 		/>
// 		<meta
// 			property="og:description"
// 			content="Welcome to Majid Ali's personal website. Discover his work, projects, and how to get in touch."
// 		/>
// 		<meta
// 			property="og:image"
// 			content="/public/soft-dev.png"
// 		/>
// 		<meta
// 			property="og:url"
// 			content="https://yourwebsite.com"
// 		/>
// 		<meta
// 			property="og:type"
// 			content="website"
// 		/>

// 		<meta
// 			name="twitter:card"
// 			content="summary_large_image"
// 		/>
// 		<meta
// 			name="twitter:title"
// 			content="Majid Ali - Personal Website"
// 		/>
// 		<meta
// 			name="twitter:description"
// 			content="Welcome to Majid Ali's personal website. Discover his work, projects, and how to get in touch."
// 		/>
// 		<meta
// 			name="twitter:image"
// 			content="/public/soft-dev.png"
// 		/>
// 	</Helmet>;