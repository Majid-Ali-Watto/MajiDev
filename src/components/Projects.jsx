/** @format */

import { Button, Flex, Icon, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import useContent from "../hooks/useContent";
import CardsList from "../ui/CardsList";
import { devGithub } from "../data/generic-data";
import { fadeInUp } from "../data/fadeInUpTransitionConfig";

// Below the grid: everything else lives on GitHub
function ExploreMore() {
	return (
		<motion.div initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }}>
			<Flex
				mt={[6, 8]}
				p={[4, 6]}
				direction={{ base: "column", md: "row" }}
				align="center"
				justify="space-between"
				gap={4}
				borderRadius="xl"
				borderWidth="1px"
				borderColor="rgba(56, 178, 172, 0.25)"
				bgGradient="linear(135deg, rgba(56, 178, 172, 0.06), rgba(128, 90, 213, 0.06))"
				textAlign={{ base: "center", md: "left" }}
			>
				<Flex align="center" gap={4} direction={{ base: "column", md: "row" }}>
					<Flex boxSize={12} flexShrink={0} align="center" justify="center" borderRadius="xl" color="white" fontSize="2xl" bgGradient="linear(to-br, teal.400, purple.500)">
						<Icon as={FaGithub} />
					</Flex>
					<div>
						<Text fontWeight="700" fontSize="lg">
							Want to see more?
						</Text>
						<Text fontSize="sm" opacity={0.75}>
							Explore the rest of my projects, experiments and open-source work on GitHub.
						</Text>
					</div>
				</Flex>
				<Button
					as="a"
					href={devGithub}
					target="_blank"
					rel="noopener noreferrer"
					colorScheme="teal"
					leftIcon={<FaGithub />}
					rightIcon={<FaExternalLinkAlt size="0.7em" />}
					flexShrink={0}
					_hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
					transition="all 0.2s"
				>
					Explore on GitHub
				</Button>
			</Flex>
		</motion.div>
	);
}

function Projects() {
	const projects = useContent("projects");
	return (
		<>
			<CardsList
				id="projects"
				heading="Projects"
				list={projects}
				buttons={["Live Preview", "Visit GitHub"]}
				showAll
			/>
			<ExploreMore />
		</>
	);
}

export default Projects;
