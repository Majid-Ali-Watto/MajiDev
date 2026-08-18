/** @format */

import { projects } from "../data/project-links";
import CardsList from "../ui/CardsList";


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
