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
			<Heading
				as="h2"
				size="xl"
				mb="6"
				textAlign="center"
				color="var(--accentColor)">
				Projects
			</Heading>

			<div className="services-container">
				{projects.map((project, index) => {
					return (
						<Card
							key={index}
							id="card"
							maxW="sm"
							height="auto"
							size="sm"
							variant="outline"
							borderWidth="1px"
							borderRadius="lg"
							overflow="hidden"
							transition="transform 0.3s ease, box-shadow 0.3s ease"
							_hover={{
								transform: "scale(1.05)",
								boxShadow: "lg"
							}}>
							<CardBody>
								<Image
									src={project.imgURL}
									alt={project.title}
									borderRadius="md"
									height="10rem"
									width="100%"
								/>
								<Stack
									mt="4"
									spacing="3">
									<Heading
										as="h4"
										size="md"
										color="var(--primaryColor)">
										{project.title}
									</Heading>
									<Text color="gray.600">{project.description}</Text>
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
											target="_blank"
											rel="noreferrer">
											Live Preview
										</Link>
									</Button>
									<Button
										colorScheme="blue"
										variant="outline">
										<Link
											href={project.gLink}
											target="_blank"
											rel="noreferrer">
											Visit GitHub
										</Link>
									</Button>
								</Stack>
							</CardFooter>
						</Card>
					);
				})}
			</div>
		</Element>
	);
}

export default Projects;
