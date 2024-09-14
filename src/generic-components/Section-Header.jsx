import { Heading } from "@chakra-ui/react";
import PropTypes from "prop-types";
import Helemt_SEO from "./Helemt";

function SectionHeader({ heading, textAlign }) {
	return (
		<>
			<Helemt_SEO />
			<Heading
				as="h2"
				size="xl"
				mb="6"
				textAlign={textAlign || "center"}
				color="#757575">
				{heading}
			</Heading>
		</>
	);
}
SectionHeader.propTypes = {
	heading: PropTypes.string.isRequired,
	textAlign: PropTypes.string
};
export default SectionHeader;
