import { CheckCircleIcon } from "@chakra-ui/icons";
import { Box, Highlight, List, ListIcon, ListItem, Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";
import { motion } from "framer-motion"; // Import framer-motion
import { Element } from "react-scroll";
import { experienceData } from "../assets/experienceData";
import SectionHeader from "../generic-components/Section-Header";
import { getExperienceYear } from "../utils/getExpYears";
import PropTypes from "prop-types";
// Subcomponent to display each experience item
const ExperienceItem = ({ description, highlightQuery }) => (
	<ListItem>
		<ListIcon as={CheckCircleIcon} color="green.500" />
		<Highlight query={highlightQuery} styles={{ px: "2", color: "blue.500" }}>
			{description}
		</Highlight>
	</ListItem>
);
ExperienceItem.propTypes = {
	description: PropTypes.string.isRequired,
	highlightQuery: PropTypes.string
};
export default function Experience() {
	const fadeInUp = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
	};

	return (
		<Element id="experience">
			<Box textAlign="left" mb="8">
				<SectionHeader heading="Experience" textAlign="left" />
			</Box>
			<motion.div initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }}>
				<Stat color="gray.700" mb={6}>
					<StatNumber>Al Habib Banking System</StatNumber>
					<StatLabel>Front End Developer at Teresol Pvt Ltd</StatLabel>
					<StatHelpText>Oct 24, 2022 - Present ({getExperienceYear()})</StatHelpText>
				</Stat>

				<List spacing={3} color="gray.700">
					{experienceData.map((item, index) => (
						<motion.div key={index} initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }}>
							<ExperienceItem description={item.description} highlightQuery={item.highlightQuery} />
						</motion.div>
					))}
				</List>
			</motion.div>
		</Element>
	);
}
