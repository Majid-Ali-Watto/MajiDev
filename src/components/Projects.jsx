/** @format */

import "../style.css";
function Projects() {
	const projects = [
		{
			title: "Git Factory",
			link: "https://git-factory.netlify.app/",
			imgURL: "/git-commands.webp",
			description: "This web app has basic Git commands at one place, easy to remember and use."
		},
		{
			title: "Mobile - Bandencentrale",
			link: "https://plattebandauto.be/",
			imgURL: "/mobile-banden.png",
			description: "This web app uses Google Maps, Email and WhatsApp Services to order tyres and vehicle related services in Belgium."
		},
		{
			title: "Sketcher",
			link: "https://drawyouwant.netlify.app/",
			imgURL: "/sketcher.png",
			description: "This web app can be used for drawings."
		},
		{
			title: "Blogs",
			link: "https://basic-blog-app.netlify.app/",
			imgURL: "/blogs.png",
			description: "This web app is developed for showing diffrent articles of different Indonesian topics."
		},
		{
			title: "Private Chat App",
			link: "https://private-ca.netlify.app/",
			imgURL: "/pca.png",
			description: "This web app is developed for chatting between two persons only."
		},
		{
			title: "Code Generator",
			link: "https://uc-struct-builder.netlify.app/",
			imgURL: "/uc.png",
			description: "This web app is developed for generating code of specific part of app in my company."
		}
	];
	// [("Hostel Activity Monitor React Native App", "Hostel Activity Monitor Web App", "Private Chat App")];
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
									width='100%'
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
