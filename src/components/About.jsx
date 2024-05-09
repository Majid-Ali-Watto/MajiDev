/** @format */

import "../style.css";
import HireMe from "./Hire-Me";
import { FaReact, FaNodeJs, FaVuejs, FaNode, FaDatabase } from "react-icons/fa";
import { FaServer } from "react-icons/fa";
import { SiMongodb } from "react-icons/si";

function About() {
	return (
		<section
			id="about"
			className="about">
			<h2>About Me</h2>
			<p className="intro-text">Passionate React/Vue.js developer with expertise in Node, Express, MongoDB, PostgreSQL, MySQL. Freelancer & Vue.js Developer @Teresol since Oct 2022. Let&apos;s create something amazing together!</p>

			<h3>My Skill-Set</h3>

			<div className="links">
				<a
					href="https://reactjs.org/"
					target="_blank"
					rel="noreferrer">
					<FaReact style={{ fontSize: "25px", color: "black", marginRight: "10px" }} />
					<span>React</span>
				</a>

				<a
					href="https://nodejs.org/"
					target="_blank"
					rel="noreferrer">
					<FaNodeJs style={{ fontSize: "25px", color: "black", marginRight: "10px" }} />
					<span>Node.js</span>
				</a>
				<a
					href="https://vuejs.org/"
					target="_blank"
					rel="noreferrer">
					<FaVuejs style={{ fontSize: "25px", color: "black", marginRight: "10px" }} />
					<span>Vue.js</span>
				</a>

				<a
					href="https://expressjs.com/"
					target="_blank"
					rel="noreferrer">
					<FaNode style={{ fontSize: "25px", color: "black", marginRight: "10px" }} />
					<span>Express.js</span>
				</a>
				<a
					href="https://www.postgresql.org/"
					target="_blank"
					rel="noreferrer">
					<FaServer style={{ fontSize: "25px", color: "black", marginRight: "10px" }} />
					<span>PostgreSQL</span>
				</a>
				<a
					href="https://www.mysql.com/"
					target="_blank"
					rel="noreferrer">
					<FaDatabase style={{ fontSize: "25px", color: "black", marginRight: "10px" }} />
					<span>MySQL</span>
				</a>
				<a
					href="https://www.mongodb.com/"
					target="_blank"
					rel="noreferrer">
					<SiMongodb style={{ fontSize: "25px", color: "black", marginRight: "10px" }} />
					<span>MongoDB</span>
				</a>
			</div>
			<br />
			<HireMe />
		</section>
	);
}

export default About;
