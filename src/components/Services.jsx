/** @format */

import { services } from "../assets/services";
import { Card, Text, Heading, CardBody, Stack, Image, Divider } from "@chakra-ui/react";
import "../style.css";
import { Element } from "react-scroll";

function Services() {
	return (
		<Element
			id="services"
			className="services">
			<Heading
				as="h2"
				size="xl"
				mb="6"
				textAlign="center"
				color="var(--accentColor)">
				Services
			</Heading>

			<div className="services-container">
				{services.map((service, index) => {
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
							}}
							m="4">
							<CardBody>
								<Image
									src={service.imgURL}
									alt={service.title}
									borderRadius="md"
									height="10rem"
									width="100%"
									// objectFit="cover"
								/>
								<Stack
									mt="4"
									spacing="3">
									<Heading
										as="h4"
										size="md"
										color="var(--primaryColor)">
										{service.title}
									</Heading>
									<Text color="gray.600">{service.description}</Text>
								</Stack>
							</CardBody>
							<Divider />
						</Card>
					);
				})}
			</div>
		</Element>
	);
}

export default Services;
