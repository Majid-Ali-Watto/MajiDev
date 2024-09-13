import { Button, Collapse, Card, CardBody, CardFooter, Divider, Heading, Image, Link, Stack, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-3d-carousel";
import { Element } from "react-scroll";
import { motion } from "framer-motion"; // Import framer-motion
import "../style.css";

function CardsList({ id, heading, list, buttons }) {
	const [cardWidth, setCardWidth] = useState();

	useEffect(() => {
		let width = window.innerWidth;
		if (width > 768) {
			width = width / 3;
		} else if (width > 500) {
			width = 400;
		} else if (width < 500) {
			width = width - 20;
		}
		setCardWidth(width);
	}, []);

	const showFooter = buttons?.length > 0;
	const [show, setShow] = useState(false);

	const handleToggle = () => setShow(!show);

	const fadeInUp = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
	};

	return (
		<Element
			id={id}
			className="projects">
			<Heading
				as="h2"
				size="xl"
				mb="6"
				textAlign="center"
				color="var(--accentColor)">
				{heading}
			</Heading>

			<Carousel
				showArrows={list?.length > 1}
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
				spread="wide"
				height="360px"
				isShadow={false}
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
								_hover={{
									transform: "scale(1.05)",
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
											in={show}>
											{record.description}
										</Collapse>
										<Text
											color="blue"
											size="sm"
											onClick={handleToggle}
											mt="0.1rem"
											cursor="pointer">
											Show {show ? "Less" : "More"}
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
