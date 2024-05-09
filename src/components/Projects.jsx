/** @format */

import "../style.css";

function Projects() {
	const projects = ["Hostel Activity Monitor React Native App", "Blog Website", "Hostel Activity Monitor Web App", "Git Factory", "Draw You Want", "Mobile - Bandencentrale", "Private Chat App"];
	return (
		<section
			id="projects"
			className="projects">
			<h2>Projects</h2>

			<div className="services-container">
				{projects.map((project, index) => {
					return (
						<div
							className="service-item"
							key={index}>
							<h3 className="service-title">{project}</h3>
							{/* <p className="service-description">{ser.description}</p> */}
						</div>
					);
				})}
			</div>
		</section>
	);
}

export default Projects;
