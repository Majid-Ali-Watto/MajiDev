/** @format */
import PropTypes from "prop-types";
import "../style.css";
import { Element } from "react-scroll";
import { Heading, Stack, Text } from "@chakra-ui/react";
import HireMe from "./Hire-Me";
import AnimatedText from "./Animate";
MyIntro.propTypes = {
	devName: PropTypes.string.isRequired,
	Contact: PropTypes.elementType.isRequired
};

export default function MyIntro({ Contact, devName }) {
	return (
		<Element
			id="home"
			className="main-content">
			<img
				src="/majid2.png"
				alt={`${devName}'s profile`}
				className="profile-img"
			/>
			<Stack
				spacing="3"
				className="intro">
				<Heading
					as="h1"
					size="3xl"
					className="dev-name">
					{devName}
				</Heading>
				<AnimatedText />
				<Contact />
				<HireMe />
			</Stack>
		</Element>
	);
}
