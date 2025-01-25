import { Box, Grid, Text, VStack } from "@chakra-ui/react";
import { Element } from "react-scroll";
import { educationData } from "../assets/educationData";
import SectionHeader from "../generic-components/Section-Header";
import { motion } from "framer-motion";
import { fadeInUp } from "../assets/fadeInUpTransitionConfig";

const Education = () => {

	return (
		<Element id="education">
			<SectionHeader heading="Education" />
			{/* Grid layout */}
			<motion.div initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }}>
				<Grid
					templateColumns={["1fr", "1fr", "1fr 1fr"]} // 1 column on mobile, 2 columns on larger screens
					gap={6} // Space between grid items
					// p={5}
					w="100%"
				>
					{educationData.map((education, index) => (
						<Box
							key={index}
							// p={5}
							// bg={gridItemBg}
							borderRadius="md"
							// boxShadow="md"
							transition="transform 0.3s ease"
							_hover={{
								transform: "translateY(-5px)",
								// boxShadow: "lg"
							}}
						>
							<VStack align="start" spacing={2}>
								<Text fontWeight="bold" fontSize="lg">
									{education.degree}
								</Text>
								<Text fontSize="md" fontWeight="semibold">
									{education.institution}
								</Text>
								<Text fontSize="sm">
									{education.duration}
								</Text>
							</VStack>
						</Box>
					))}
				</Grid>
			</motion.div>
		</Element>
	);
};

export default Education;
