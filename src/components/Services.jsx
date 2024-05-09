/** @format */
import "../style.css";
function Services() {
	const service = [
		{
			title: "Web Development",
			description: "Responsive and dynamic websites, web applications, and backend systems using modern frameworks like React.JS and Vue.JS"
		},

		{
			title: "Database Integration",
			description: "Designing, implementing, and managing databases to ensure efficient data storage and retrieval for clients' applications in PostgreSQL, MySQL, and MongoDB"
		},
		{
			title: "Code Review and Optimization",
			description: "Reviewing existing codebases, identifying areas for improvement, and implementing optimizations to enhance performance and maintainability."
		},

		{
			title: "API Development",
			description: "Build robust APIs using Node.js and Express, facilitating data exchange between front-end applications and databases, as well as third-party integrations."
		}
	];
	return (
		<section
			id="services"
			className="services">
			<h2 className="section-title">Services</h2>
			<div className="services-container">
				{service.map((ser, index) => {
					return (
						<div
							className="service-item"
							key={index}>
							<h3 className="service-title">{ser.title}</h3>
							<p className="service-description">{ser.description}</p>
						</div>
					);
				})}
			</div>
		</section>
	);
}

export default Services;
