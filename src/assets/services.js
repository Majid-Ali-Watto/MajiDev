const link = import.meta.env.VITE_HIRE_ME_URL;
export const services = [
	{
		title: "Web Development",
		imgURL: "/web-dev.webp",
		link,
		description: "Responsive and dynamic websites, web applications, and backend systems using modern frameworks like React.JS, Vue.JS and Node.JS"
	},

	{
		title: "Database Integration",
		imgURL: "/database.webp",
		link,
		description: "Designing, implementing, and managing databases to ensure efficient data storage and retrieval for clients' applications in PostgreSQL, MySQL, and MongoDB"
	},
	// {
	// 	title: "Code Review and Optimization",
	// 	description: "Reviewing existing codebases, identifying areas for improvement, and implementing optimizations to enhance performance and maintainability."
	// },

	{
		title: "API Development",
		imgURL: "/api.webp",
		link,
		description: "Build robust APIs using Node.js and Express, facilitating data exchange between front-end applications and databases, as well as third-party integrations."
	}
];
