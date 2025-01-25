import { Heading } from "@chakra-ui/react";
import PropTypes from "prop-types";
import Helmet_SEO from "./Helmet";

function SectionHeader({ heading, textAlign = "center" }) {
	return (
		<>
			<Helmet_SEO />
			<Heading as="h2" size="xl" mb="6" textAlign={textAlign}>
				{heading?.toUpperCase()}
			</Heading>
		</>
	);
}
SectionHeader.propTypes = {
	heading: PropTypes.string.isRequired,
	textAlign: PropTypes.string
};
export default SectionHeader;
