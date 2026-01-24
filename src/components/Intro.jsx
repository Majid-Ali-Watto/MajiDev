/** @format */
import PropTypes from "prop-types";
import { Element } from "react-scroll";
import { Button, Heading, Stack } from "@chakra-ui/react";
import AnimatedText from "./Animate";
import { devFullName } from "../assets/generic-data";
import { skills, skillsObj } from "../assets/skills";
import { educationData } from "../assets/educationData";

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
  const printResume = () => {
    const about = document.getElementById("about");
    const contacts = document.getElementsByClassName("contact-link");
    const skillSet = {};
    for (const type of skillsObj) {
      skillSet[type.label] = skills[type.type].map((skill) => skill.label);
    }
    const resumeData = {};
    const contactLinks = {};
    for (const contact of contacts) {
      if (contact.attributes.href === undefined) continue;
      else if (contact.attributes.href.value.includes("mailto:"))
        contactLinks["Email"] = contact.attributes.href.value?.replace(
          "mailto:",
          "",
        );
      else if (contact.attributes.href.value.includes("wa.me"))
        contactLinks["Phone"] = contact.attributes.href.value?.replace(
          "https://wa.me/",
          "",
        );
      else if (contact.attributes.href.value.includes("linkedin.com"))
        contactLinks["LinkedIn"] = contact.attributes.href.value;
      else if (contact.attributes.href.value.includes("github.com"))
        contactLinks["GitHub"] = contact.attributes.href.value;
    }
    const name = document.getElementsByClassName("dev-name");
    const devPost = document.getElementsByClassName("typing-text");

    resumeData["Professional Summary"] = about.textContent?.split("Me")[1];
    resumeData["Name"] = name[0].textContent;
    resumeData["Post"] = devPost[0].textContent;
    resumeData["Contacts"] = contactLinks;
    resumeData["Skills"] = skillSet;
    resumeData["Education"] = educationData;

    console.dir(resumeData);
  };
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
        {/* <Button variant="outline" onClick={printResume}>
          Download as Resume
        </Button> */}
      </Stack>
    </Element>
  );
}
