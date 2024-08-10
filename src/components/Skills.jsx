import { skills, skillsObj } from "../assets/skills";
import { Grid, GridItem, Stack, HStack, Tag, TagLeftIcon, Heading, Box, Divider, Flex } from "@chakra-ui/react";

export default function Skills() {
	return (
		<Grid
			templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(5, 1fr)" }}
			gap={6}>
			{skillsObj.map((skillsObj, index) => (
				<GridItem
					key={index}
					w="100%"
					colSpan={{
						base: 1,
						sm: 2,
						md: skillsObj.label === "Front End" ? 2 : 1,
						lg: skillsObj.label === "Front End" ? 2 : 1
					}}>
					<Box
						padding={5}
						borderRadius="md"
						boxShadow="lg"
						backgroundColor="white"
						height="100%" // Ensures the card takes the full height of the GridItem
						display="flex"
						flexDirection="column"
						justifyContent="space-between" // Distributes the content vertically
						_hover={{ boxShadow: "xl", transform: "scale(1.05)" }}
						transition="all 0.3s ease-in-out">
						<Flex
							flexDirection="column"
							flex="1"
							justifyContent="space-between">
							<Stack
								spacing={3}
								flex="1">
								<Heading
									as="h6"
									size="md"
									color="teal.600"
									display="flex"
									justifyContent="center"
									alignItems="center">
									{skillsObj.label}
								</Heading>
								<Divider />
								<Flex
									className="links"
									aria-labelledby={skillsObj.label}
									wrap="wrap"
									justifyContent="center">
									{skills[skillsObj.type].map((skill, index) => (
										<Tag
											width={{ base: "100%", sm: "150px" }}
											key={index}
											size="lg"
											variant="solid"
											colorScheme="blue"
											mb={2}
											borderRadius="full">
											<TagLeftIcon
												boxSize="15px"
												style={{ fontSize: "20px", color: "white", marginRight: "10px" }}
												as={skill.iconName}
											/>
											<span style={{ color: "white" }}>{skill.label}</span>
										</Tag>
									))}
								</Flex>
							</Stack>
						</Flex>
					</Box>
				</GridItem>
			))}
		</Grid>
	);
}
