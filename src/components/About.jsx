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
				<title>About Me - Full Stack Web Developer</title>
				<meta
					name="description"
					content="Learn more about me, a Full Stack Web Developer from Pakistan with expertise in front-end and back-end technologies."
				/>
				<meta
					name="keywords"
					content="Full Stack Web Developer, Vue.js Developer, Web Development, Freelancer"
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
