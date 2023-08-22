/** @format */

import "../style.css";
import PropTypes from "prop-types";

Footer.propTypes = {
	owner: PropTypes.string,
};
function Footer({ owner }) {
	return (
		<footer className="footer">
			<p className="copy-right">
				&copy; {new Date().getFullYear()} {owner}. All rights reserved.
			</p>
		</footer>
	);
}

export default Footer;
