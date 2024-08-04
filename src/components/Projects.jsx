/** @format */

import { projects } from "../assets/project-links";
import "../style.css";
function Projects() {
	return (
		<section
			id="projects"
			className="projects">
			<h2>Projects</h2>

			<div className="services-container">
				{projects.map((project, index) => {
					return (
						<a
							id="project-link"
							href={project.link}
							target="_blank"
							rel="noreferrer"
							key={index}>
							<div className="service-item">
								<h3 className="service-title">{project.title}</h3>
								<img
									width="100%"
									height={200}
									src={project.imgURL}
								/>
								<p className="service-description">{project.description}</p>
							</div>
						</a>
					);
				})}
			</div>
		</section>
	);
}

export default Projects;
