/** @format */

import PropTypes from "prop-types";
import "../style.css";

Footer.propTypes = {
	owner: PropTypes.string,
};
function Footer({ owner }) {
	return (
		<footer className="footer">
			<p className="copy-right">
				&copy; {new Date().getFullYear()} {owner}. Islamabad, Pakistan.
			</p>
		</footer>
	);
}

export default Footer;
