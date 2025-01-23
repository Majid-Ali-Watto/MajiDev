/** @format */

import { Box, Highlight, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Element } from "react-scroll";
import SectionHeader from "../generic-components/Section-Header";
import { motion } from "framer-motion"; // Import framer-motion
About.propTypes = {
	about: PropTypes.string
};

function About({ about }) {
	const fadeInUp = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
	};
	return (
		<Element id="about" className="about">
			<Box textAlign="left" mb="8">
				<SectionHeader heading="About Me" textAlign="center" />
			</Box>
			<motion.div initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }}>
				<Text fontSize="md">
					<Highlight query={["Full Stack Web Developer", "Vue", "React", "Node.js", "Express"]} styles={{ color: "green.500", textAlign: "left" }}>
						{about || "Full Stack Web Developer with over 2 years of experience specializing in Vue, React, Node.js, and Express. Proficient in building scalable micro front-end architectures, modernizing legacy systems, and delivering efficient, user-focused solutions. Skilled in optimizing performance and developing reusable components for seamless software delivery."}
					</Highlight>
				</Text>
			</motion.div>
		</Element>
	);
}

export default About;
