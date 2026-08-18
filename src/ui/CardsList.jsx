import { HStack, Tag, Button, Collapse, Card, CardBody, CardFooter, Divider, Heading, Image, Stack, Grid, Box, IconButton } from "@chakra-ui/react";
import { FaExpand } from "react-icons/fa";
import PropTypes from "prop-types";
import { useState } from "react";
import { Element } from "react-scroll";
import { motion } from "framer-motion";

import SectionHeader from "./SectionHeader";
import Helmet_SEO from "./Helmet";
import { fadeInUp } from "../data/fadeInUpTransitionConfig";

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
			<Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={[3, 4, 6]} mt={[3, 6]}>
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
								{record.imgURL && (
								<Box position="relative" role="group">
									<Image src={record.imgURL} alt={record.title} borderRadius="md" height="14rem" width="100%" objectFit="cover" />
									<IconButton
										aria-label="View full image"
										icon={<FaExpand />}
										position="absolute"
										bottom="8px"
										right="8px"
										opacity={0}
										_groupHover={{ opacity: 1 }}
										transition="opacity 0.3s"
										bg="rgba(0, 0, 0, 0.7)"
										color="white"
										_hover={{ bg: "rgba(0, 0, 0, 0.9)" }}
										borderRadius="full"
										size="sm"
										onClick={() => window.open(record.imgURL, '_blank')}
									/>
								</Box>
								)}
								<Stack mt={[2, 4]} spacing={[1, 3]}>
									<Heading as="h4" size="md">
										{record.title}
									</Heading>
									<Collapse animateOpacity transition={{ enter: { duration: 0.5 } }} key={index} startingHeight={20} in={show[index]}>
										{record.description}
									</Collapse>
									<Button variant="link" colorScheme="blue" fontSize="md" onClick={(event) => handleToggle(event, index)} mt="0.1rem">
										Show {show[index] ? "Less" : "More"}
									</Button>
								</Stack>
							</CardBody>
							<Divider />
							{showFooter && (
								<CardFooter>
									<HStack spacing="3">
										{buttons.map((button, idx) => {
											const href = idx === 0 ? record.link : record.gLink;
											if (!href) return null;
											return (
												<Button key={idx} as="a" href={href} target="_blank" rel="noopener noreferrer" variant="outline">
													{button}
												</Button>
											);
										})}
									</HStack>
								</CardFooter>
							)}
							{record?.stack?.length > 0 && (
								<HStack justify="flex-start" align="center" wrap="wrap" px={[1, 3]} pb={[1, 2]} spacing="5px">
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
			<HStack spacing={4} mt={[3, 6]} justify="center">
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
