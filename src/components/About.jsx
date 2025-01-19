/** @format */

import { Box, Grid, GridItem, Highlight, Text } from "@chakra-ui/react";
import { lazy } from "react";
import { Element } from "react-scroll";
import SectionHeader from "../generic-components/Section-Header";
const Experience = lazy(() => import("./Experience"));

function About() {
	return (
		<Element id="about" className="about">
			<Grid
				templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} // Adjusts to 1 column on small screens and 2 columns on medium and larger screens
				gap={12} // Adjust gap between columns
				px="4"
				mx="auto"
				mb="8"
			>
				{/* Column 1 */}
				<GridItem>
					<Box textAlign="left" mb="8">
						<SectionHeader heading="About Me" textAlign="left" />
					</Box>
					<Text fontSize="md" color="gray.700">
						<Highlight query={["Full Stack Web Developer", "Vue", "React", "Node.js", "Express"]} styles={{ color: "blue.500", textAlign: "left" }}>
							Full Stack Web Developer with over 2 years of experience specializing in Vue, React, Node.js, and Express. Proficient in building scalable micro front-end architectures, modernizing legacy systems, and delivering efficient, user-focused solutions. Skilled in optimizing performance and developing reusable components for seamless software delivery.
						</Highlight>
					</Text>
				</GridItem>

				{/* Column 2 */}
				<GridItem>
					<Experience />
				</GridItem>
			</Grid>
		</Element>
	);
}

export default About;
