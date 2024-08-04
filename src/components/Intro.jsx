/** @format */
import PropTypes from "prop-types";
import "../style.css";

MyIntro.propTypes = {
	devName: PropTypes.string.isRequired,
	Contact: PropTypes.elementType.isRequired
};

export default function MyIntro({ Contact, devName }) {
	return (
		<section className="main-content">
			<img
				src="/majid2.png"
				alt={`${devName}'s profile`}
				className="profile-img"
			/>
			<div className="intro">
				<h1 className="dev-name">{devName}</h1>
				<p className="dev-proff">{import.meta.env.VITE_APP_DEV_POST}</p>
				<Contact />
			</div>
		</section>
	);
}
