/** @format */

import PropTypes from "prop-types";
import { Text,Box } from "@chakra-ui/react";

Footer.propTypes = {
	owner: PropTypes.string
};
function Footer({ owner }) {
	return (
		<Box as="footer" py={2} textAlign="center">
			<Text fontSize="lg" className="copy-right">
				&copy; {new Date().getFullYear()} {owner}. Islamabad, Pakistan.
			</Text>
		</Box>
	);
}

export default Footer;
