/** @format */

import useContent from "../hooks/useContent";
import CardsList from "../ui/CardsList";


function Projects() {
	const projects = useContent("projects");
	return (
		<CardsList
			id="projects"
			heading="Projects"
			list={projects}
			buttons={["Live Preview", "Visit GitHub"]}
			showAll
		/>
	);
}

export default Projects;
