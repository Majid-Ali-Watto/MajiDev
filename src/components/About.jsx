/** @format */

import "../style.css";
import HireMe from "./Hire-Me";
import Skills from "./Skills";

function About() {
	return (
		<section
			id="about"
			className="about">
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
