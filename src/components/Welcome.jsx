import { Box, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const typing = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

export default function Welcome() {
	return (
		<Box
			position="fixed"
			top={0}
			left={0}
			right={0}
			bottom={0}
			display="flex"
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			bg="#1a1a2e"
			zIndex={9999}
		>
			{/* Terminal window */}
			<Box
				bg="#0d1117"
				borderRadius="lg"
				overflow="hidden"
				width={{ base: "90%", md: "500px" }}
				boxShadow="0 20px 60px rgba(0, 0, 0, 0.5)"
				border="1px solid"
				borderColor="gray.700"
			>
				{/* Title bar */}
				<Box
					bg="#161b22"
					px={4}
					py={2}
					display="flex"
					alignItems="center"
					gap={2}
					borderBottom="1px solid"
					borderColor="gray.700"
				>
					<Box w={3} h={3} borderRadius="full" bg="#ff5f56" />
					<Box w={3} h={3} borderRadius="full" bg="#ffbd2e" />
					<Box w={3} h={3} borderRadius="full" bg="#27c93f" />
					<Text fontSize="xs" color="gray.500" ml={3} fontFamily="monospace">
						~/portfolio
					</Text>
				</Box>

				{/* Terminal content */}
				<Box p={5} fontFamily="'Fira Code', monospace" fontSize="sm">
					<Text color="green.400" mb={2}>
						<Text as="span" color="cyan.400">majid</Text>
						<Text as="span" color="gray.500">@</Text>
						<Text as="span" color="purple.400">dev</Text>
						<Text as="span" color="gray.500"> ~ $ </Text>
						<Text as="span" color="gray.100">npm run portfolio</Text>
					</Text>

					<Text color="gray.500" mb={2}>
						&gt; compiling components...
					</Text>

					<Text color="gray.500" mb={2}>
						&gt; loading modules...
					</Text>

					<Box display="flex" alignItems="center">
						<Text color="green.400" mr={1}>
							&gt;
						</Text>
						<Text
							color="green.300"
							overflow="hidden"
							whiteSpace="nowrap"
							animation={`${typing} 2s steps(20) infinite`}
						>
							initializing portfolio...
						</Text>
						<Text
							color="green.300"
							animation={`${blink} 1s step-end infinite`}
							ml="1px"
						>
							▌
						</Text>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}
