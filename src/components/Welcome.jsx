import { Modal, ModalOverlay, ModalContent, ModalBody, Progress, Text } from "@chakra-ui/react";

export default function Welcome() {
	return (
		<Modal isOpen isCentered aria-labelledby="loading-text">
			<ModalOverlay />
			<ModalContent boxShadow="none" display="flex" alignItems="center" justifyContent="center" width={{ base: "90%", md: "50%" }}>
				<ModalBody display="flex" flexDirection="column" alignItems="center" justifyContent="center" width="100%">
					<Text id="loading-text" mb={4} fontSize="lg" color="teal">
						Loading Portfolio
					</Text>
					<Progress size="lg" isIndeterminate colorScheme="teal" width="100%" />
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
