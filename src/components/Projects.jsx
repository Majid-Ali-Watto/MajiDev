/** @format */

import { projects } from "../assets/project-links";
import { Link, Card, Text, Heading, Divider, Button, CardBody, Stack, Image, CardFooter } from "@chakra-ui/react";
import "../style.css";
import { Element } from "react-scroll";
function Projects() {
	return (
		<Element
			id="projects"
			className="projects">
			<Heading>Projects</Heading>

			<div className="services-container">
				{projects.map((project, index) => {
					return (
						<div key={index}>
							<Card
								id="card"
								maxW="sm"
								height="24rem"
								size="sm"
								variant="outline">
								<CardBody>
									<Image
										src={project.imgURL}
										alt={project.title}
										borderRadius="md"
										height="10rem"
										width="100%"
										// objectFit="contain"
									/>
									<Stack
										mt="6"
										spacing="3">
										<Heading
											as="h4"
											size="md">
											{project.title}
										</Heading>
										<Text>{project.description}</Text>
									</Stack>
								</CardBody>
								<Divider />
								<CardFooter>
									<Stack
										align="center"
										direction="row"
										spacing="3">
										<Button
											colorScheme="teal"
											variant="outline">
											<Link
												href={project.link}
												to={project.link}
												target="_blank">
												Visit Website
											</Link>
										</Button>
										<Button>
											<Link>Visit GitHub</Link>
										</Button>
									</Stack>
								</CardFooter>
							</Card>
						</div>
					);
				})}
			</div>
		</Element>
	);
}

export default Projects;
{
	/* <a
							id="project-link"
							href={project.link}
							target="_blank"
							rel="noreferrer"
							key={index}>
							<div className="service-item">
								<h3 className="service-title">{project.title}</h3>
								<img
									width="100%"
									height={200}
									src={project.imgURL}
								/>
								<p className="service-description">{project.description}</p>
							</div>
						</a> */
}
