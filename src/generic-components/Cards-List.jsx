import { Heading } from "@chakra-ui/react";
import { Element } from "react-scroll";
import PropTypes from "prop-types";
import "../style.css";
import { Link, Card, Text, Divider, Button, CardBody, Stack, Image, CardFooter } from "@chakra-ui/react";

function CardsList({ id, heading, list, buttons }) {
	const showFooter = buttons?.length > 0;
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
			<div className="services-container">
				{list.map((record, index) => {
					return (
						<Card
							key={index}
							id="card"
							maxW="sm"
							height="auto"
							size="sm"
							variant="outline"
							borderWidth="1px"
							borderRadius="lg"
							overflow="hidden"
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
									<Text color="gray.600">{record.description}</Text>
								</Stack>
							</CardBody>
							<Divider />
							{showFooter > 0 && (
								<CardFooter>
									<Stack
										align="center"
										direction="row"
										spacing="3">
										{buttons.map((button, index) => {
											return (
												<Button
													key={index}
													colorScheme="teal"
													variant="outline">
													<Link
														href={index == 0 ? record.link : record.gLink}
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
					);
				})}
			</div>
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
