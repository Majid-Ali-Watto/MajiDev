import { HStack,Tag, Button, Collapse, Card, CardBody, CardFooter, Divider, Heading, Image, Link, Stack, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-3d-carousel";
import { Element } from "react-scroll";
import { motion } from "framer-motion"; // Import framer-motion

import getScreenWidth from "../utils/screen-width";
import SectionHeader from "./Section-Header";
import Helemt_SEO from "./Helemt";

function CardsList({ id, heading, list, buttons }) {
	const [cardWidth, setCardWidth] = useState();
	const [show, setShow] = useState(Array(list.length).fill(false));
	const [isPaused, setIsPaused] = useState(false); // Track if carousel should pause
	const showFooter = buttons?.length > 0;

	useEffect(() => {
		setCardWidth(getScreenWidth());
	}, []);

	const handleToggle = (e, index) => {
		e.stopPropagation();
		const updatedShowMore = [...show];
		updatedShowMore[index] = !updatedShowMore[index];
		setShow(updatedShowMore);
	};
	// Handle click on carousel item to pause it
	const handleItemClick = () => {
		setIsPaused((prev) => !prev); // Set pause state to true
	};
	const fadeInUp = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
	};

	return (
		<Element
			id={id}
			className="projects">
			<Helemt_SEO />
			<SectionHeader heading={heading} />
			<Carousel
				showArrows={list?.length > 1}
				arrowsDefaultColor="#757575"
				indicatorsActiveColor="#757575"
				indicatorsInactiveColor="#333"
				isIndicatorsShadow={false}
				showIndicators={false}
				statusColor="#757575"
				arrowsHeight={cardWidth > 500 ? "50px" : "35px"}
				arrowsWidth={cardWidth > 500 ? "30px" : "20px"}
				isStatusShadow={false}
				depth={2}
				spread="wide"
				height="350px"
				isShadow={true}
				autoPlay={!isPaused} // Disable autoPlay if paused
				onClick={handleItemClick} // Pause carousel on item click
				pauseOnHover={true} // Works for desktop
				pauseOnInteraction={true} // Ensure pause on interaction
				pauseOnTouch={true} // Pause on touch for mobile
				width={cardWidth + "px"}>
				{list.map((record, index) => {
					return (
						<motion.div
							key={index}
							initial="hidden"
							whileInView="visible"
							variants={fadeInUp}
							viewport={{ once: true }}>
							<Card
								height="350px"
								size="sm"
								variant="outline"
								borderWidth="1px"
								borderRadius="lg"
								overflow="auto"
								transition="transform 0.3s ease, box-shadow 0.3s ease"
								onClick={handleItemClick} // Handle click on item
								_hover={{
									transform: "scale(1.01)",
									boxShadow: "lg"
								}}>
								<CardBody>
									<Image
										src={record.imgURL}
										alt={record.title}
										borderRadius="md"
										height="10rem"
										width="100%"
									/>
									<Stack
										mt="4"
										spacing="3">
										<Heading
											as="h4"
											size="md"
											color="var(--primaryColor)">
											{record.title}
										</Heading>
										<Collapse
											animateOpacity
											transition={{ enter: { duration: 0.5 } }}
											key={index}
											startingHeight={20}
											in={show[index]}>
											{record.description}
										</Collapse>
										<Text
											color="blue"
											size="sm"
											onClick={(event) => handleToggle(event, index)}
											mt="0.1rem"
											cursor="pointer">
											Show {show[index] ? "Less" : "More"}
										</Text>
									</Stack>
								</CardBody>
								<Divider />
								{showFooter && (
									<CardFooter>
										<Stack
											align="center"
											direction="row"
											spacing="3">
											{buttons.map((button, idx) => {
												return (
													<Button
														key={idx}
														colorScheme="teal"
														variant="outline">
														<Link
															href={idx === 0 ? record.link : record.gLink}
															target="_blank"
															rel="noreferrer">
															{button}
														</Link>
													</Button>
												);
											})}
										</Stack>
									</CardFooter>
								)}
								{record?.stack?.length > 0 && (
									<HStack
										justify="flex-start"
										align="center"
										wrap='wrap'
										px={3}
										pb={2}
										spacing="5px">
										{record?.stack.map((item) => (
											<Tag
												key={item}
												colorScheme="blue"
												size="md">
												{item}
											</Tag>
										))}
									</HStack>
								)}
							</Card>
						</motion.div>
					);
				})}
			</Carousel>
		</Element>
	);
}

CardsList.propTypes = {
	id: PropTypes.string.isRequired,
	heading: PropTypes.string.isRequired,
	list: PropTypes.arrayOf(Object).isRequired,
	buttons: PropTypes.arrayOf(Object)
};

export default CardsList;
