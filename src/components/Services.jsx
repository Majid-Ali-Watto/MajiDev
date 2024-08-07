import { services } from "../assets/services";
import { Card, Text, Heading, CardBody, Stack, Image } from "@chakra-ui/react";
import "../style.css";
import { Element } from "react-scroll";
function Services() {
	return (
		<Element
			id="services"
			className="services">
			<Heading>Services</Heading>

			<div className="services-container">
				{services.map((service, index) => {
					return (
						<div key={index}>
							<Card
								id="card"
								maxW="sm"
								height="22rem"
								size="sm"
								variant="outline">
								<CardBody>
									<Image
										src={service.imgURL}
										alt={service.title}
										borderRadius="md"
										height="10rem"
										width="100%"
									/>
									<Stack
										mt="6"
										spacing="3">
										<Heading
											as="h4"
											size="md">
											{service.title}
										</Heading>
										<Text>{service.description}</Text>
									</Stack>
								</CardBody>
							</Card>
						</div>
					);
				})}
			</div>
		</Element>
	);
}

export default Services;
