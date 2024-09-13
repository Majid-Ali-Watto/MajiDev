import { Stat, Heading, StatLabel, Highlight, StatNumber, StatHelpText, Box } from "@chakra-ui/react";
import { List, ListItem, ListIcon } from "@chakra-ui/react";
import { Element } from "react-scroll";
import { motion } from "framer-motion"; // Import framer-motion
import "../style.css";
import { CheckCircleIcon } from "@chakra-ui/icons";

// Helper function to calculate experience years, months, and days
function getExperienceYear() {
	const sdt = new Date("2022-10-24"); // Start date
	const currentDate = new Date(); // Current date

	let years = currentDate.getFullYear() - sdt.getFullYear();
	let months = currentDate.getMonth() - sdt.getMonth();
	let days = currentDate.getDate() - sdt.getDate();

	if (days < 0) {
		months--;
		days += new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate(); // Get the days in previous month
	}
	if (months < 0) {
		years--;
		months += 12;
	}

	return `${years}Y ${months}M ${days}D`;
}

// Subcomponent to display each experience item
const ExperienceItem = ({ description, highlightQuery }) => (
	<ListItem>
		<ListIcon
			as={CheckCircleIcon}
			color="green.500"
		/>
		<Highlight
			query={highlightQuery}
			styles={{ px: "2", color: "blue.500" }}>
			{description}
		</Highlight>
	</ListItem>
);

export default function Experience() {
	const fadeInUp = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
	};

	const experienceData = [
		{
			description: "Working as a Vue.js developer on a core banking project for Bank Al-Habib Limited.",
			highlightQuery: ["Bank Al-Habib Limited"]
		},
		{
			description: "Remapping the old front end (Java Code) to Vue.js.",
			highlightQuery: []
		},
		{
			description: "Optimized front end architecture, resulting in a decrease in server requests and improvement in page rendering speed.",
			highlightQuery: []
		},
		{
			description: "Developed features for Banking Modules like Teller, CRM, Remittance, Term Deposit.",
			highlightQuery: ["Teller", "CRM", "Remittance", "Term Deposit"]
		}
	];

	return (
		<Element
			id="experience"
			>
			<Box
				textAlign="left"
				mb="8">
				<Heading
					as="h2"
					size="2xl"
					color="var(--primaryColor)"
					mb="4">
					Experience
				</Heading>
			</Box>
			<motion.div
				initial="hidden"
				whileInView="visible"
				variants={fadeInUp}
				viewport={{ once: true }}>
				<Stat
					color="gray.700"
					mb={6}>
					<StatNumber>Al Habib Banking System</StatNumber>
					<StatLabel>Front End Developer at Teresol Pvt Ltd</StatLabel>
					<StatHelpText>Oct 24, 2022 - Present ({getExperienceYear()})</StatHelpText>
				</Stat>

				<List
					spacing={3}
					color="gray.700">
					{experienceData.map((item, index) => (
						<motion.div
							key={index}
							initial="hidden"
							whileInView="visible"
							variants={fadeInUp}
							viewport={{ once: true }}>
							<ExperienceItem
								description={item.description}
								highlightQuery={item.highlightQuery}
							/>
						</motion.div>
					))}
				</List>
			</motion.div>
		</Element>
	);
}
