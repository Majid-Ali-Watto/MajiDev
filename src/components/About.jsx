/** @format */

import "../style.css";
import HireMe from "./Hire-Me";
import Skills from "./Skills";
import { Helmet } from "react-helmet";
function About() {
	return (
		<section
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
			<h2>About Me</h2>
			<p className="intro-text">
				Hi, I&apos;m Pakistan based <u>Full Stack Web Developer</u> skilled in both front-end and back-end technologies. Freelancer & <strong>Vue.js Developer @Teresol</strong> since Oct 2022. Let&apos;s create something amazing together!
			</p>
			<br />
			<br />
			<h3>My Skill-Set</h3>
			<br />
			<Skills />
			<br />
			<br />
			<HireMe />
		</section>
	);
}

export default About;
