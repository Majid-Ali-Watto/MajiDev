/** @format */
import { FaCss3, FaDatabase, FaHtml5, FaNodeJs, FaReact, FaVuejs } from "react-icons/fa";
import { SiElement, SiExpress, SiFirebase, SiGit, SiGithub, SiGitlab, SiJavascript, SiMongodb, SiMysql, SiPostgresql, SiRedux, SiTailwindcss, SiTypescript } from "react-icons/si";

export const skills = {
	fe: [
		{ label: "React.js", iconName: FaReact },
		{ label: "Vue.js", iconName: FaVuejs },
		{ label: "JavaScript", iconName: SiJavascript },
		{ label: "TypeScript", iconName: SiTypescript },
		{ label: "CSS3", iconName: FaCss3 },
		{ label: "HTML5", iconName: FaHtml5 },
		{ label: "Tailwind CSS", iconName: SiTailwindcss },
		{ label: "Redux", iconName: SiRedux },
		{ label: "Vuex", iconName: FaDatabase },
		{ label: "Element Plus", iconName: SiElement }
	],
	be: [
		{ label: "Node.js", iconName: FaNodeJs },
		{ label: "Express.js", iconName: SiExpress }
	],
	db: [
		{ label: "PostgreSQL", iconName: SiPostgresql },
		{ label: "MySQL", iconName: SiMysql },
		{ label: "MongoDB", iconName: SiMongodb },
		{ label: "Firebase", iconName: SiFirebase }
	],
	vc: [
		{ label: "Git", iconName: SiGit },
		{ label: "GitHub", iconName: SiGithub },
		{ label: "GitLab", iconName: SiGitlab }
	]
};
