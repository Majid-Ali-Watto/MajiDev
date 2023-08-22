/** @format */

import "../style.css";

function Projects() {
	const projects = ["Hostel Activity Monitor React Native App", "Blog Website", "Hostel Activity Monitor Web App"];
	return (
		<section id="projects" className="projects">
			<h2>Projects</h2>
			{projects.map((project, index) => {
				return <h3 key={index}>{project}</h3>;
			})}
		</section>
	);
}

export default Projects;
