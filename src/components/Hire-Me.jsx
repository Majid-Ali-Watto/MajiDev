import { Link, Grid, GridItem, Center, Box, Divider } from "@chakra-ui/react";
import "../style.css";

export default function HireMe() {
	return (
		<Box
			p={5}
			bg="gray.50"
			borderRadius="md">
			<Grid
				templateColumns="repeat(6, 1fr)"
				gap={4}
				alignItems="center">
				<GridItem colSpan={2}>
					<Link
						href="https://www.upwork.com/freelancers/~018c214d3139f0f30e"
						target="_blank"
						rel="noreferrer"
						color="blue.500"
						fontWeight="bold">
						Hire Me
					</Link>
				</GridItem>
				<Center height="30px">
					<Divider orientation="vertical" />
				</Center>

				<GridItem colSpan={3}>
					<Link
						href="/Majid-Ali-Resume-Updated.pdf"
						download={true}
						color="blue.500"
						fontWeight="bold">
						Download Resume
					</Link>
				</GridItem>
			</Grid>
		</Box>
	);
}
