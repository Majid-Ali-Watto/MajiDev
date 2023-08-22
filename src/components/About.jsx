/** @format */

import "../style.css";

function About() {
	const paras = [
		"Greetings! I'm a versatile developer well-versed in web and mobile technologies like React Native, Vue.js, React, Node.js, Express, and databases including PostgreSQL and MySQL. My journey started as a freelancer, refining my skills by creating dynamic and user-friendly web and Android applications.",
		"After successfully delivering numerous projects as a freelancer, I transitioned into the role of a Vue.js Developer at Teresol Pvt Ltd. Here, I'm deeply engaged in the Vue.js ecosystem, working on pioneering projects that demand seamless user experiences and intuitive interfaces.",
		"My hands-on experience with diverse technologies, coupled with my commitment to staying current with industry trends, empowers me to provide top-notch solutions meeting user expectations and business objectives. I thrive on challenges and adopt a problem-solving approach, utilizing my expertise in React Native, Vue.js, React, Node.js, and Express to construct sturdy and efficient applications.",
		"As a developer, I prioritize understanding users' and businesses' fundamental needs over merely coding. My belief is that technology should elevate lives, and my aim is to contribute through crafting functional and user-friendly software.",
		"With a freelancing background and a current role at Teresol Pvt Ltd, I'm dedicated to continuous growth, enhancing my skills, and staying abreast of developments. I'm always enthusiastic about embarking on new projects, collaborating with passionate teams, and playing my part in the ever-evolving landscape of web and mobile development.",
	];
	return (
		<section id="about" className="about">
			<h2>About Me</h2>
			{paras.map((para, index) => {
				return <p key={index}>{para} </p>;
			})}
			<p></p>
		</section>
	);
}

export default About;
