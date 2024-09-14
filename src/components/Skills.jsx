import { Box, Divider, Flex, Heading, Stack, Tag, TagLeftIcon } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-3d-carousel";
import { skills, skillsObj } from "../assets/skills";
import getScreenWidth from "../utils/screen-width";
import { Element } from "react-scroll";
import SectionHeader from "../generic-components/Section-Header";
export default function Skills() {
	const [cardWidth, setCardWidth] = useState();
	const [isPaused, setIsPaused] = useState(false); // Track if carousel should pause

	useEffect(() => {
		setCardWidth(getScreenWidth());
	}, []);

	// Handle click on carousel item to pause it
	const handleItemClick = () => {
		setIsPaused((prev) => !prev); // Set pause state to true
	};

	return (
		<Element
			id="skills"
			className="skills">
			<Box
				textAlign="center"
				mb="6">
				<SectionHeader heading="Skills"/>
			</Box>
			<Carousel
				width={cardWidth + "px"}
				showArrows={skillsObj?.length > 1}
				transitionTime={1000}
				arrowsDefaultColor="#757575"
				indicatorsActiveColor="#757575"
				indicatorsInactiveColor="#333"
				isIndicatorsShadow={false}
				showIndicators={true}
				statusColor="#757575"
				arrowsHeight={cardWidth > 500 ? "50px" : "35px"}
				arrowsWidth={cardWidth > 500 ? "30px" : "20px"}
				isStatusShadow={false}
				depth={2}
				pauseOnHover={true} // Works for desktop
				pauseOnInteraction={true} // Ensure pause on interaction
				pauseOnTouch={true} // Pause on touch for mobile
				isShadow={true}
				height="300px"
				spread="wide"
				autoPlay={!isPaused} // Disable autoPlay if paused
				onClick={handleItemClick} // Pause carousel on item click
			>
				{skillsObj.map((skillsObj, index) => (
					<Box
						key={index}
						padding={5}
						borderRadius="md"
						boxShadow="sm"
						backgroundColor="white"
						display="flex"
						borderWidth="1px"
						flexDirection="column"
						justifyContent="space-between"
						_hover={{ boxShadow: "xl", transform: "scale(1.05)" }}
						transition="all 0.3s ease-in-out"
						onClick={handleItemClick} // Handle click on item
					>
						<Flex
							flexDirection="column"
							flex="1"
							overflowY="auto"
							justifyContent="space-between">
							<Stack
								spacing={2}
								flex="1">
								<Heading
									as="h6"
									size="md"
									color="teal.600"
									display="flex"
									justifyContent="center"
									alignItems="center">
									{skillsObj.label}
								</Heading>
								<Divider />
								<Flex
									className="links"
									aria-labelledby={skillsObj.label}
									wrap="wrap"
									overflowY="auto"
									maxHeight="380px"
									justifyContent="center">
									{skills[skillsObj.type].map((skill, index) => (
										<Tag
											width={{ base: "40%", sm: "9rem" }}
											key={index}
											size="md"
											variant="solid"
											colorScheme="blue"
											mb={1}
											borderRadius="md">
											<TagLeftIcon
												boxSize="15px"
												style={{ fontSize: "20px", color: "white", marginRight: "10px" }}
												as={skill.iconName}
											/>
											<span style={{ color: "white" }}>{skill.label}</span>
										</Tag>
									))}
								</Flex>
							</Stack>
						</Flex>
					</Box>
				))}
			</Carousel>
		</Element>
	);
}
