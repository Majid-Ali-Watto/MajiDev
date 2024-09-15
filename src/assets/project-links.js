const commonStack = ["React.js", "HTML", "CSS", "JavaScript"];
export const projects = [
	{
		title: "Git Factory",
		link: "https://git-factory.netlify.app/",
		gLink: "https://github.com/Majid-Ali-Watto/Git-factory.git",
		imgURL: "/git-commands.webp",
		description: "This web app has basic Git commands at one place, easy to remember and use.",
		stack: [...commonStack]
	},
	{
		title: "Mobile - Bandencentrale",
		link: "https://plattebandauto.be/",
		gLink: "https://github.com/Majid-Ali-Watto/Mobile-Bandencentrale.git",
		imgURL: "/mobile-banden.webp",
		description: "This web app uses Google Maps, Email and WhatsApp Services to order tyres and vehicle related services in Belgium.",
		stack: [...commonStack, "TailwindCss", "Yup", "Formik", "Google Maps", "EmailJS"]
	},
	{
		title: "Sketcher",
		link: "https://drawyouwant.netlify.app/",
		gcLink: "https://github.com/Majid-Ali-Watto/Sketcher.git",
		imgURL: "/sketcher.png",
		description: "This web app can be used for drawings.",
		stack: [...commonStack]
	},
	{
		title: "Blogs",
		link: "https://basic-blog-app.netlify.app/",
		gLink: "https://github.com/Majid-Ali-Watto/Basic-Blogs.git",
		imgURL: "/blogs.webp",
		description: "This web app is developed for showing diffrent articles of different Indonesian topics.",
		stack: [...commonStack.slice(0, 3), "TypeScript"]
	},
	{
		title: "Private Chat App",
		link: "https://private-ca.netlify.app/",
		imgURL: "/pca.png",
		description: "This web app is developed for chatting between two persons only.",
		stack: [...commonStack, "FireBase"]
	},
	{
		title: "Code Generator",
		link: "https://uc-struct-builder.netlify.app/",
		gLink: "https://github.com/Majid-Ali-Watto/code-generator-fe-hoc.git",
		imgURL: "/uc.png",
		description: "This web app is developed for generating code of specific part of app in my company.",
		stack: ["Vue.js", ...commonStack.slice(1)]
	},
	{
		title: "Images Gallery",
		link: "https://picsforu.netlify.app/",
		gLink: "https://github.com/Majid-Ali-Watto/Loader-PicsAPI.git",
		imgURL: "/picsforu.webp",
		description: "Pictures are fetched from picsum, being displayed as Gallery, user can download them.",
		stack: [...commonStack].slice(1)
	},
	{
		title: "World Countries",
		link: "https://worldcountrieslist.netlify.app/",
		gLink: "https://github.com/Majid-Ali-Watto/world-countries.git",
		imgURL: "/countries.png",
		description: "List of countries with major data.",
		stack: [...commonStack]
	},
	{
		title: "User Management API",
		link: "https://fake-user-api.up.railway.app/api/v1/users",
		gLink: "https://github.com/Majid-Ali-Watto/fake-user-api",
		imgURL: "/user-api.webp",
		description: "This is a User Management API that allows you to manage users with CRUD operations. You can create, read, update, and delete users through the various endpoints provided.",
		stack: ["Node.js", "Express.js", "Javascript"]
	},

];
// [("Hostel Activity Monitor React Native App", "Hostel Activity Monitor Web App", "Private Chat App")];
