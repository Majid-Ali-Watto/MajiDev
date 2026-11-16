import { HStack, Tag, Button, Collapse, Card, CardBody, CardFooter, Heading, Stack, Grid } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useState } from "react";
import { Element } from "react-scroll";
import { motion } from "framer-motion";

import SectionHeader from "./SectionHeader";
import CardImage from "./CardImage";
import { fadeInUp } from "../data/fadeInUpTransitionConfig";
import { previewSrc } from "../data/siteContent";

function CardsList({ id, heading, list, buttons, showAll, preview }) {
	const [show, setShow] = useState(Array(list.length).fill(false));
	const [pageCount, setPageCount] = useState(3);
	const visibleCount = showAll ? list.length : pageCount;
	const maxPerLoad = 3;
	const showFooter = buttons?.length > 0;

	const handleToggle = (e, index) => {
		e.stopPropagation();
		const updatedShowMore = [...show];
		updatedShowMore[index] = !updatedShowMore[index];
		setShow(updatedShowMore);
	};

	const handleLoadMore = () => {
		setPageCount((prev) => prev + maxPerLoad);
	};

	const handleLoadLess = () => {
		setPageCount((prev) => (prev > maxPerLoad ? prev - maxPerLoad : prev));
	};

	return (
		<Element id={id} className="projects">
			<SectionHeader heading={heading} />
			<Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={[3, 4, 6]} mt={[3, 6]}>
				{list.slice(0, visibleCount).map((record, index) => {
					const image = record.imgURL || (preview ? previewSrc(record.link) : "");
					return (
						<motion.div key={index} initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }}>
							<Card
								height="100%"
								variant="outline"
								bg="chakra-body-bg"
								borderRadius="xl"
								overflow="hidden"
								role="group"
								transition="transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease"
								_hover={{ transform: "translateY(-4px)", boxShadow: "xl", borderColor: "teal.400" }}
							>
								{image && <CardImage src={image} alt={record.title} />}
							<CardBody>
									<Stack spacing={[2, 3]}>
										<Heading as="h4" size="md">
											{record.title}
										</Heading>
										{record?.stack?.length > 0 && (
											<HStack wrap="wrap" spacing={0} gap={1.5}>
												{record.stack.map((item) => (
													<Tag key={item} colorScheme="teal" size="sm" borderRadius="full">
														{item}
													</Tag>
												))}
											</HStack>
										)}
										<Collapse animateOpacity transition={{ enter: { duration: 0.5 } }} startingHeight={20} in={show[index]}>
											{record.description}
										</Collapse>
										<Button variant="link" colorScheme="teal" fontSize="sm" alignSelf="flex-start" onClick={(event) => handleToggle(event, index)}>
											Show {show[index] ? "Less" : "More"}
										</Button>
									</Stack>
								</CardBody>
								{showFooter && (
									<CardFooter pt={0}>
										<HStack spacing="3">
											{buttons.map((button, idx) => {
												const href = idx === 0 ? record.link : record.gLink;
												if (!href) return null;
												return (
													<Button
														key={idx}
														as="a"
														href={href}
														target="_blank"
														rel="noopener noreferrer"
														size="sm"
														colorScheme="teal"
														variant={idx === 0 ? "solid" : "outline"}
													>
														{button}
													</Button>
												);
											})}
										</HStack>
									</CardFooter>
								)}
							</Card>
						</motion.div>
					);
				})}
			</Grid>

			{!showAll && (
				<HStack spacing={4} mt={[3, 6]} justify="center">
					{visibleCount < list.length && <Button onClick={handleLoadMore}>Load More</Button>}
					{visibleCount > maxPerLoad && <Button onClick={handleLoadLess}>Load Less</Button>}
				</HStack>
			)}
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
	buttons: PropTypes.arrayOf(PropTypes.string),
	showAll: PropTypes.bool,
	preview: PropTypes.bool
};

export default CardsList;
