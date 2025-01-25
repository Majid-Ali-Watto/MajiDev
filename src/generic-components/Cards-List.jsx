import { HStack, Tag, Button, Collapse, Card, CardBody, CardFooter, Divider, Heading, Image, Link, Stack, Text, Grid } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useState } from "react";
import { Element } from "react-scroll";
import { motion } from "framer-motion";

import SectionHeader from "./Section-Header";
import Helmet_SEO from "./Helmet";
import { fadeInUp } from "../assets/fadeInUpTransitionConfig";

function CardsList({ id, heading, list, buttons }) {
	const [show, setShow] = useState(Array(list.length).fill(false));
	const [visibleCount, setVisibleCount] = useState(3); // Initially show 6 items
	const maxPerLoad = 3;
	const showFooter = buttons?.length > 0;

	const handleToggle = (e, index) => {
		e.stopPropagation();
		const updatedShowMore = [...show];
		updatedShowMore[index] = !updatedShowMore[index];
		setShow(updatedShowMore);
	};

	const handleLoadMore = () => {
		setVisibleCount((prev) => prev + maxPerLoad);
	};

	const handleLoadLess = () => {
		setVisibleCount((prev) => (prev > maxPerLoad ? prev - maxPerLoad : prev));
	};

	return (
		<Element id={id} className="projects">
			<Helmet_SEO heading={heading} />
			<SectionHeader heading={heading} />
			<Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6} mt={6}>
				{list.slice(0, visibleCount).map((record, index) => (
					<motion.div key={index} initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }}>
						<Card
							height="100%"
							variant="outline"
							borderWidth="1px"
							borderRadius="lg"
							overflow="hidden"
							transition="transform 0.3s ease, box-shadow 0.3s ease"
							_hover={{
								transform: "scale(1.02)",
								boxShadow: "2xl"
							}}
						>
							<CardBody>
								<Image src={record.imgURL} alt={record.title} borderRadius="md" height="10rem" width="100%" objectFit="cover" />
								<Stack mt="4" spacing="3">
									<Heading as="h4" size="md">
										{record.title}
									</Heading>
									<Collapse animateOpacity transition={{ enter: { duration: 0.5 } }} key={index} startingHeight={20} in={show[index]}>
										{record.description}
									</Collapse>
									<Text color="blue.500" fontSize="md" onClick={(event) => handleToggle(event, index)} mt="0.1rem" cursor="pointer">
										Show {show[index] ? "Less" : "More"}
									</Text>
								</Stack>
							</CardBody>
							<Divider />
							{showFooter && (
								<CardFooter>
									<HStack spacing="3">
										{buttons.map((button, idx) => (
											<Button key={idx} variant="outline">
												<Link href={idx === 0 ? record.link : record.gLink} target="_blank" rel="noopener noreferrer">
													{button}
												</Link>
											</Button>
										))}
									</HStack>
								</CardFooter>
							)}
							{record?.stack?.length > 0 && (
								<HStack justify="flex-start" align="center" wrap="wrap" px={3} pb={2} spacing="5px">
									{record.stack.map((item) => (
										<Tag key={item} colorScheme="blue" size="md">
											{item}
										</Tag>
									))}
								</HStack>
							)}
						</Card>
					</motion.div>
				))}
			</Grid>

			{/* Load More / Load Less Button */}
			<HStack spacing={4} mt={6} justify="center">
				{visibleCount < list.length && <Button onClick={handleLoadMore}>Load More</Button>}
				{visibleCount > maxPerLoad && <Button onClick={handleLoadLess}>Load Less</Button>}
			</HStack>
		</Element>
	);
}

CardsList.propTypes = {
	id: PropTypes.string.isRequired,
	heading: PropTypes.string.isRequired,
	list: PropTypes.arrayOf(
		PropTypes.shape({
			imgURL: PropTypes.string,
			title: PropTypes.string,
			description: PropTypes.string,
			link: PropTypes.string,
			gLink: PropTypes.string,
			stack: PropTypes.arrayOf(PropTypes.string)
		})
	).isRequired,
	buttons: PropTypes.arrayOf(PropTypes.string)
};

export default CardsList;
