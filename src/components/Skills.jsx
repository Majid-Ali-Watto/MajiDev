import { skills } from "../assets/skills";
export default function Skills() {
	return (
		<section
			className="links"
			aria-labelledby="skills-heading">
			{skills.map((skill, index) => {
				return (
					<a key={index}>
						<skill.iconName
							aria-label={skill.label}
							style={{ fontSize: "25px", color: "black", marginRight: "10px" }}
						/>
						<span>{skill.label}</span>
					</a>
				);
			})}
		</section>
	);
}
