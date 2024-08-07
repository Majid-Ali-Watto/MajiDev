/** @format */

import { Heading, Stack, Text, Highlight } from "@chakra-ui/react";
import "../style.css";
import HireMe from "./Hire-Me";
import Skills from "./Skills";
import { Element } from "react-scroll";
import { Helmet } from "react-helmet";
function About() {
	return (
		<Element
			id="about"
			className="about">
			<Helmet>
				<title>Majid Ali || Vue JS Developer || React JS Developer|| Front-End Developer || Full Stack Web Developer || Full Stack Developer</title>

				<meta
					name="description"
					content="Learn more about me, a Full Stack Web Developer from Pakistan with expertise in front-end and back-end technologies. Majid Ali's personal website. Explore his projects, portfolio, and get in touch with him for collaborations or inquiries."
				/>
				<meta
					name="keywords"
					content="Full Stack Web Developer, Vue.js Developer, Web Development, Freelancer, Majid Ali, Majid, Vue JS Developer, React JS Developer, Web Developer, Software Engineer, Portfolio, Front End Developer, Front-End Developer, Full Stack Web Developer"
				/>
				<meta
					name="author"
					content="Majid Ali"
				/>

				<meta
					property="og:title"
					content="Majid Ali - Personal Website"
				/>
				<meta
					property="og:description"
					content="Welcome to Majid Ali's personal website. Discover his work, projects, and how to get in touch."
				/>
				<meta
					property="og:image"
					content="/public/soft-dev.png"
				/>
				<meta
					property="og:url"
					content="https://yourwebsite.com"
				/>
				<meta
					property="og:type"
					content="website"
				/>

				<meta
					name="twitter:card"
					content="summary_large_image"
				/>
				<meta
					name="twitter:title"
					content="Majid Ali - Personal Website"
				/>
				<meta
					name="twitter:description"
					content="Welcome to Majid Ali's personal website. Discover his work, projects, and how to get in touch."
				/>
				<meta
					name="twitter:image"
					content="/public/soft-dev.png"
				/>
			</Helmet>
			<Heading>About Me</Heading>
			<Stack spacing="5">
				<Text>
					<Highlight
						query={["Full Stack Web Developer", "Vue.js Developer @Teresol"]}
						styles={{ px: "2", rounded: "md", bg: "yellow" }}>
						Hi, I&apos;m Pakistan based Full Stack Web Developer skilled in both front-end and back-end technologies. Freelancer & Vue.js Developer @Teresol since Oct 2022. Let&apos;s create something amazing together!
					</Highlight>
				</Text>
				{/* <Text className="intro-text">
					Hi, I&apos;m Pakistan based <strong>Full Stack Web Developer</strong> skilled in both front-end and back-end technologies. Freelancer & <strong>Vue.js Developer @Teresol</strong> since Oct 2022. Let&apos;s create something amazing together!
				</Text> */}
				<Heading
					as="h3"
					size="md">
					My Skill-Set
				</Heading>
				<Skills />
				{/* <HireMe /> */}
			</Stack>
		</Element>
	);
}

export default About;
