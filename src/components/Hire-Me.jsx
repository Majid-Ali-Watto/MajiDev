import { Link, Grid, GridItem, Center, Box, Divider } from "@chakra-ui/react";

export default function HireMe() {
	return (
		<Box
			px={4}
			py={2}
			// bg="gray.100"
			borderWidth="1px"
			borderRadius="md"
		>
			<Grid
				templateColumns="repeat(6, 1fr)"
				// gap={1}
				alignItems="center"
			>
				<GridItem colSpan={2}>
					<Link
						href={import.meta.env.VITE_HIRE_ME_URL}
						target="_blank"
						rel="noreferrer"
						// color="blue.500"
						fontWeight="bold"
					>
						Hire Me
					</Link>
				</GridItem>
				<Center height="30px">
					<Divider orientation="vertical" />
				</Center>

				<GridItem colSpan={3}>
					<Link href="https://drive.google.com/file/d/1j3Vm4WiZoihRIf31BUXfMqxcKShU1Jot/view?usp=drivesdk" download={true} target="_blank" fontWeight="bold">
						Resume
					</Link>
				</GridItem>
			</Grid>
		</Box>
	);
}
