/** @format */
import "../style.css";
function Services() {
	const service = [
		{
			title: "Web Development",
			description: "Responsive and dynamic websites, web applications, and backend systems using modern frameworks and technologies.",
		},
		{
			title: "Mobile App Development",
			description: "React Native cross-platform mobile applications that offer seamless user experiences on both iOS and Android platforms.",
		},
		{
			title: "Database Integration",
			description:
				"Designing, implementing, and managing databases to ensure efficient data storage and retrieval for clients' applications in PostgreSQL, MySQL, and MongoDB",
		},
		{
			title: "Code Review and Optimization",
			description:
				"Reviewing existing codebases, identifying areas for improvement, and implementing optimizations to enhance performance and maintainability.",
		},
		{
			title: "Project Collaboration",
			description:
				"Collaborating with passionate teams. I could offer my skills to collaborate on larger projects that require a diverse skill set.",
		},
		{
			title: "CMS Development",
			description:
				"Build custom content management systems (CMS) using React or Vue.js, empowering clients to manage and update their website content seamlessly.",
		},
		{
			title: "API Development",
			description:
				"Build robust APIs using Node.js and Express, facilitating data exchange between front-end applications and databases, as well as third-party integrations.",
		},
		{
			title: "Custom Web Application Development",
			description:
				"Tailored to clients' unique requirements, utilizing technologies like Vue.js, React, Node.js, and Express to deliver feature-rich and scalable solutions.",
		},
	];
	return (
		<section id="services" className="services">
			<h2 className="section-title">Services</h2>
			{service.map((ser, index) => {
				return (
					<div className="service-item" key={index}>
						<h3 className="service-title">
							{index + 1}: {ser.title}
						</h3>
						<p className="service-description">{ser.description}</p>
					</div>
				);
			})}
		</section>
	);
}

export default Services;
