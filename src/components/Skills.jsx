import { FaArrowRight } from "react-icons/fa6";
import { skills, skillsObj } from "../assets/skills";
import { List, ListItem, ListIcon, HStack, Tag, TagLeftIcon, Heading, Stack } from "@chakra-ui/react";
export default function Skills() {
	return (
		<List spacing={3}>
			{skillsObj.map((skillsObj, index) => {
				return (
					<ListItem key={index}>
						<Stack direction='row'>
							<ListIcon
								as={FaArrowRight}
								color="green.500"
							/>
							<Stack>
								<Heading
									as="h6"
									size="sm">
									{skillsObj.label}
								</Heading>
								<HStack
									className="links"
									id="skillsLink"
									aria-labelledby={skillsObj.label}>
									{skills[skillsObj.type].map((skill, index) => {
										return (
											<Tag
												key={index}
												size="lg"
												variant="outline"
												colorScheme="blue">
												<TagLeftIcon
													boxSize="15px"
													style={{ fontSize: "20px", color: "black", marginRight: "10px" }}
													as={skill.iconName}
												/>
												<span style={{ color: "black" }}>{skill.label}</span>
											</Tag>
										);
									})}
								</HStack>
							</Stack>
						</Stack>
					</ListItem>
				);
			})}
		</List>
	);
}
