import { Box, Divider, Flex, Heading, Stack, Tag, TagLeftIcon } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-3d-carousel";
import { skills, skillsObj } from "../assets/skills";

export default function Skills() {
	const [cardWidth, setCardWidth] = useState();

	useEffect(() => {
		let width = window.innerWidth;
		if (width > 768) {
			width = width / 3;
		} else if (width > 500) {
			width = 400;
		} else if (width < 500) {
			width = width - 30;
		}
		setCardWidth(width);
	}, []);

	return (
		<div>
			<Carousel
				width={cardWidth + "px"}
				showArrows={skillsObj?.length > 1}
				transitionTime={1000}
				arrowsDefaultColor="#757575"
				indicatorsActiveColor="#757575"
				indicatorsInactiveColor="#333"
				isIndicatorsShadow={false}
				showIndicators={false}
				statusColor="#757575"
				arrowsHeight="50px"
				arrowsWidth="30px"
				isStatusShadow={false}
				depth={2}
				isShadow={false}
				height="400px"
				spread="wide">
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
						justifyContent="space-between" // Distributes the content vertically
						_hover={{ boxShadow: "xl", transform: "scale(1.05)" }}
						transition="all 0.3s ease-in-out">
						<Flex
							flexDirection="column"
							flex="1"
							overflowY="auto"
							justifyContent="space-between">
							<Stack
								spacing={3}
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
									justifyContent="center">
									{skills[skillsObj.type].map((skill, index) => (
										<Tag
											width={{ base: "100%", sm: "150px" }}
											key={index}
											size="lg"
											variant="solid"
											colorScheme="blue"
											mb={2}
											borderRadius="full">
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
		</div>
	);
}
