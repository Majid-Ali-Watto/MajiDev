import { FaReact, FaNodeJs, FaVuejs, FaCss3, FaHtml5, FaDatabase } from "react-icons/fa";
import { SiMongodb, SiExpress, SiTailwindcss, SiPostgresql, SiMysql, SiRedux, SiGit, SiJavascript, SiFirebase, SiElement } from "react-icons/si";
export default function Skills() {
	return (
		<div className="links">
			<a>
				<FaReact style={{ fontSize: "25px", color: "black", marginRight: "10px" }} />
				<span>React.js</span>
			</a>
			<a>
				<FaNodeJs style={{ fontSize: "25px", color: "black", marginRight: "10px" }} />
				<span>Node.js</span>
			</a>
			<a>
				<FaVuejs style={{ fontSize: "25px", color: "black", marginRight: "10px" }} />
				<span>Vue.js</span>
			</a>
			<a>
				<SiExpress style={{ fontSize: "25px", color: "black", marginRight: "10px" }} />
				<span>Express.js</span>
			</a>
			<a>
				<SiPostgresql style={{ fontSize: "25px", color: "black", marginRight: "10px" }} />
				<span>PostgreSQL</span>
			</a>
			<a>
				<SiMysql style={{ fontSize: "25px", color: "black", marginRight: "10px" }} />
				<span>MySQL</span>
			</a>
			<a>
				<SiMongodb style={{ fontSize: "25px", color: "black", marginRight: "10px" }} />
				<span>MongoDB</span>
			</a>
			<a>
				<FaCss3 style={{ fontSize: "25px", color: "black", marginRight: "10px" }} />
				<span>CSS3</span>
			</a>
			<a>
				<FaHtml5 style={{ fontSize: "25px", color: "black", marginRight: "10px" }} />
				<span>HTML5</span>
			</a>
			<a>
				<SiTailwindcss style={{ fontSize: "25px", color: "black", marginRight: "10px" }} />
				<span>Tailwindcss</span>
			</a>
			<a>
				<SiRedux style={{ fontSize: "25px", color: "black", marginRight: "10px" }} />
				<span>Redux</span>
			</a>
			<a>
				<SiGit style={{ fontSize: "25px", color: "black", marginRight: "10px" }} />
				<span>Git</span>
			</a>
			<a>
				<SiJavascript style={{ fontSize: "25px", color: "black", marginRight: "10px" }} />
				<span>Javascript</span>
			</a>
			<a>
				<SiFirebase style={{ fontSize: "25px", color: "black", marginRight: "10px" }} />
				<span>Firebase</span>
			</a>
			<a>
				<FaDatabase style={{ fontSize: "25px", color: "black", marginRight: "10px" }} />
				<span>Vuex</span>
			</a>

			<a>
				<SiElement style={{ fontSize: "25px", color: "black", marginRight: "10px" }} />
				<span>Element Plus</span>
			</a>
		</div>
	);
}
