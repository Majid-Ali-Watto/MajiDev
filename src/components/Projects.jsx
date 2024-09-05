/** @format */

import { projects } from "../assets/project-links";
import CardsList from "../generic-components/Cards-List";
import "../style.css";

function Projects() {
	return (
		<CardsList
			id="projects"
			heading="Projects"
			list={projects}
			buttons={["Live Preview", "Visit GitHub"]}
		/>
	);
}

export default Projects;
