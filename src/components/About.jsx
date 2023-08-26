/** @format */

import "../style.css";
import HireMe from "./Hire-Me";
function About() {
	const paras = [
		"Hello! I'm a versatile developer experienced in React Native, Vue.js, React, Node.js, Express, PostgreSQL, and MySQL. I started as a freelancer, honing my skills by creating dynamic web and Android apps.",
		"I transitioned from freelancing to being a Vue.js Developer at Teresol Pvt Ltd. Here, I work on innovative projects for seamless user experiences.",
		"I offer top-notch solutions by staying updated with tech trends. I excel in React Native, Vue.js, React, Node.js, and Express, building robust applications.",
		"I prioritize grasping users' and businesses' core needs. My goal is functional, user-friendly software that improves lives.",
		"With a freelancing background and role at Teresol Pvt Ltd, I'm committed to growth, skill enhancement, and embracing new projects in web and mobile development.",
	];
	return (
		<section id="about" className="about">
			<h2>About Me</h2>
			{paras.map((para, index) => {
				return <p key={index}>{para} </p>;
			})}

			<HireMe />
		</section>
	);
}

export default About;
