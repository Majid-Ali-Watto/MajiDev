import { Box, Grid, Text } from "@chakra-ui/react";
import { Element } from "react-scroll";
import { educationData } from "../assets/educationData";
import SectionHeader from "../generic-components/Section-Header";

const Education = () => {
	return (
		<Element id="education" className="about">
			<SectionHeader heading="Education" />
			{/* Grid layout */}
			<Grid
				templateColumns={["1fr", "1fr", "1fr 1fr"]} // 1 column on mobile, 2 columns on larger screens
				gap={6} // Space between grid items
				p={5}
				w="100%"
			>
				{educationData.map((education, index) => (
					<Box key={index} p={5} textAlign="left">
						<Text fontWeight="bold" fontSize="lg" mb={2}>
							{education.degree}
						</Text>
						<Text fontSize="md">{education.institution}</Text>
						<Text fontSize="lg" color="gray.500">
							{education.duration}
						</Text>
					</Box>
				))}
			</Grid>
		</Element>
	);
};

export default Education;
