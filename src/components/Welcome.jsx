import { Modal, ModalOverlay, ModalContent, ModalBody, Progress, Text } from "@chakra-ui/react";

export default function Welcome() {
	return (
		<Modal
			isOpen={true}
			isCentered={true}>
			<ModalOverlay />
			<ModalContent
				bg="yellow"
				boxShadow="none"
				display="flex"
				alignItems="center"
				width="90%"
				justifyContent="center">
				<ModalBody
					display="flex"
					flexDirection="column"
					alignItems="center"
					justifyContent="center"
					width="100%">
					<Text
						mb={4}
						fontSize="lg"
						color="green">
						Loading Portfolio
					</Text>
					<Progress
						size="md"
						isIndeterminate
						colorScheme="blue"
						width="100%"
					/>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
