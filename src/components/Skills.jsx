import { Box, Grid, Text, Heading, Card } from "@chakra-ui/react";
import { skills, skillsObj } from "../assets/skills"; // Adjust the import path as needed
import { motion } from "framer-motion";
import SectionHeader from "../generic-components/Section-Header";

const SkillCard = ({ label, icon: Icon }) => {
	return (
		// boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
		// <Box display="flex" flexDirection="column" alignItems="center" outline justifyContent="center" p="1rem" borderRadius="8px" transition="box-shadow 0.3s ease" _hover={{ boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.15),-1px -1px 1px rgba(0, 0, 0, 0.15)" }}>
		<Card
			display="flex"
			flexDirection="column"
			alignItems="center"
			outline
			justifyContent="center"
			p="1rem"
			height="100%"
			variant="outline"
			borderWidth="1px"
			borderRadius="lg"
			overflow="hidden"
			transition="transform 0.3s ease, box-shadow 0.3s ease"
			_hover={{
				transform: "scale(1.02)",
				boxShadow: "2xl"
			}}
		>
			<Box fontSize="2rem" color="blue.500" mb="0.5rem">
				<Icon />
			</Box>
			<Text fontSize="1rem" fontWeight="500">
				{label}
			</Text>
		</Card>
		// </Box>
	);
};

const SkillsSection = () => {
	const fadeInUp = {
		hidden: { opacity: 0, y: 50 },
		visible: { opacity: 1, y: 0, transition: { duration: 1.2 } }
	};

	return (
		<Box as="section" id="skills">
			<Box mx="auto">
				<SectionHeader heading="Skills" />
				<Box display="grid" gap="2rem">
					{skillsObj.map(({ label, type }) => (
						<Box key={type} mb="1.5rem">
							<Heading as="h6" textAlign="center" fontSize="large" mb="1rem">
								{label}
							</Heading>
							<motion.div initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }}>
								<Grid templateColumns="repeat(auto-fit, minmax(120px, 1fr))" gap="0.5rem">
									{skills[type].map((skill) => (
										<SkillCard key={skill.label} label={skill.label} icon={skill.iconName} />
									))}
								</Grid>
							</motion.div>
						</Box>
					))}
				</Box>
			</Box>
		</Box>
	);
};

export default SkillsSection;
