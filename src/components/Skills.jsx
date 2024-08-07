import { skills, skillsObj } from "../assets/skills";
export default function Skills() {
	return (
		<section>
			{skillsObj.map((skillsObj) => {
				return (
					<div key={skillsObj.label}>
						<div>
							<strong style={{ color: "#333" }}>{skillsObj.label}</strong>
						</div>
						<br />
						<section
							className="links"
							id="skillsLink"
							aria-labelledby={skillsObj.label}>
							{skills[skillsObj.type].map((skill, index) => {
								return (
									<a key={index}>
										<skill.iconName
											aria-label={skill.label}
											style={{ fontSize: "20px", color: "black", marginRight: "10px" }}
										/>
										<span>{skill.label}</span>
									</a>
								);
							})}
						</section>
						<br />
					</div>
				);
			})}
		</section>
	);
}
