/** @format */
import PropTypes from "prop-types";
import { Element } from "react-scroll";
import { Heading, Stack } from "@chakra-ui/react";
import AnimatedText from "./Animate";
import { devFullName } from "../assets/generic-data";

MyIntro.propTypes = {
  devName: PropTypes.string.isRequired,
  Contact: PropTypes.elementType.isRequired,
  image: PropTypes.string,
};

export default function MyIntro({
  Contact,
  devName = devFullName,
  image = "/majid2.webp",
}) {
  return (
    <Element id="home" className="main-content">
      <img
        src={image}
        alt={devName ? `${devName}'s profile` : "Developer's profile image"}
        className="profile-img"
        onError={(e) => (e.target.src = "/majid2.webp")}
      />
      <Stack spacing={3} className="intro">
        <Heading as="h1" size="2xl" className="dev-name">
          {devName}
        </Heading>
        <AnimatedText />
        <Contact />
      </Stack>
    </Element>
  );
}
