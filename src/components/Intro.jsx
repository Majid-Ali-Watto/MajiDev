/** @format */
import PropTypes from "prop-types";
import "../style.css";
import { Element } from "react-scroll";
import { Heading, Stack, Text } from "@chakra-ui/react";
import HireMe from "./Hire-Me";
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
				<Text className="dev-proff">{import.meta.env.VITE_APP_DEV_POST}</Text>
				<Contact />
				<HireMe />
			</Stack>
		</Element>
	);
}
