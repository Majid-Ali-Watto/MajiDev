/** @format */

import { Box, Grid, GridItem, Highlight, Text } from "@chakra-ui/react";
import { lazy } from "react";
import { Element } from "react-scroll";
import SectionHeader from "../generic-components/Section-Header";
const Experience = lazy(() => import("./Experience"));

function About() {
	return (
		<Element
			id="about"
			className="about">
			<Grid
				templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} // Adjusts to 1 column on small screens and 2 columns on medium and larger screens
				gap={12} // Adjust gap between columns
				px="4"
				mx="auto"
				mb="8">
				{/* Column 1 */}
				<GridItem>
					<Box
						textAlign="left"
						mb="8">
						<SectionHeader
							heading="About Me"
							textAlign="left"
						/>
					</Box>
					<Text
						fontSize="lg"
						color="gray.700">
						<Highlight
							query={["Full Stack Web Developer", "Vue.js Developer @Teresol"]}
							styles={{ px: "2", color: "blue.500" }}>
							Hi, I&apos;m a Pakistan-based Full Stack Web Developer skilled in both front-end and back-end technologies. Freelancer & Vue.js Developer @Teresol since Oct 2022. Let&apos;s create something amazing together!
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
