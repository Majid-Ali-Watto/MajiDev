import { FaCss3, FaDatabase, FaHtml5, FaNodeJs, FaReact, FaVuejs } from "react-icons/fa";
import { SiElement, SiExpress, SiFirebase, SiGit, SiJavascript, SiMongodb, SiMysql, SiPostgresql, SiRedux, SiTailwindcss, SiTypescript } from "react-icons/si";
export default function Skills() {
	return (
		<section
			className="links"
			aria-labelledby="skills">
			<a>
				<FaReact
					aria-label="React.js"
					style={{ fontSize: "25px", color: "black", marginRight: "10px" }}
				/>
				<span>React.js</span>
			</a>
			<a>
				<FaVuejs
					aria-label="Vue.js"
					style={{ fontSize: "25px", color: "black", marginRight: "10px" }}
				/>
				<span>Vue.js</span>
			</a>
			<a>
				<SiJavascript
					aria-label="Javascript"
					style={{ fontSize: "25px", color: "black", marginRight: "10px" }}
				/>
				<span>Javascript</span>
			</a>
			<a>
				<SiTypescript
					aria-label="Typescript"
					style={{ fontSize: "25px", color: "black", marginRight: "10px" }}
				/>
				<span>Typescript</span>
			</a>
			<a>
				<FaCss3
					aria-label="CSS3"
					style={{ fontSize: "25px", color: "black", marginRight: "10px" }}
				/>
				<span>CSS3</span>
			</a>
			<a>
				<FaHtml5
					aria-label="HTML5"
					style={{ fontSize: "25px", color: "black", marginRight: "10px" }}
				/>
				<span>HTML5</span>
			</a>
			<a>
				<SiTailwindcss
					aria-label="Tailwindcss"
					style={{ fontSize: "25px", color: "black", marginRight: "10px" }}
				/>
				<span>Tailwindcss</span>
			</a>
			<a>
				<SiRedux
					aria-label="Redux"
					style={{ fontSize: "25px", color: "black", marginRight: "10px" }}
				/>
				<span>Redux</span>
			</a>
			<a>
				<FaDatabase
					aria-label="Vuex"
					style={{ fontSize: "25px", color: "black", marginRight: "10px" }}
				/>
				<span>Vuex</span>
			</a>

			<a>
				<SiElement
					aria-label="Element Plus"
					style={{ fontSize: "25px", color: "black", marginRight: "10px" }}
				/>
				<span>Element Plus</span>
			</a>
			<a>
				<FaNodeJs
					aria-label="Node.js"
					style={{ fontSize: "25px", color: "black", marginRight: "10px" }}
				/>
				<span>Node.js</span>
			</a>

			<a>
				<SiExpress
					aria-label="Express.js"
					style={{ fontSize: "25px", color: "black", marginRight: "10px" }}
				/>
				<span>Express.js</span>
			</a>
			<a>
				<SiPostgresql
					aria-label="PostgreSQL"
					style={{ fontSize: "25px", color: "black", marginRight: "10px" }}
				/>
				<span>PostgreSQL</span>
			</a>
			<a>
				<SiMysql
					aria-label="MySQL"
					style={{ fontSize: "25px", color: "black", marginRight: "10px" }}
				/>
				<span>MySQL</span>
			</a>
			<a>
				<SiMongodb
					aria-label="MongoDB"
					style={{ fontSize: "25px", color: "black", marginRight: "10px" }}
				/>
				<span>MongoDB</span>
			</a>

			<a>
				<SiFirebase
					aria-label="Firebase"
					style={{ fontSize: "25px", color: "black", marginRight: "10px" }}
				/>
				<span>Firebase</span>
			</a>

			<a>
				<SiGit
					aria-label="Git"
					style={{ fontSize: "25px", color: "black", marginRight: "10px" }}
				/>
				<span>Git</span>
			</a>
		</section>
	);
}
