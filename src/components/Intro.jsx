import PropTypes from "prop-types";
MyIntro.propTypes = {
	devName: PropTypes.string,
	Contact: PropTypes.elementType
};
export default function MyIntro({ Contact, devName }) {
	return (
		<div className="main-content">
			<img src="/majid2.png" />

			<div className="intro">
				<span className="dev-name">{devName}</span>
				<span className="dev-proff">{import.meta.env.VITE_APP_DEV_POST}</span>
				<Contact />
			</div>
		</div>
	);
}
