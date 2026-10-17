import { Suspense, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaArrowRight, FaFileDownload, FaPrint } from "react-icons/fa";
import useContent, { loadContent } from "../hooks/useContent";
import printResume, { RESUME_SECTIONS } from "../utils/printResume";

// Shown while the Résumés section loads
const OptionsSkeleton = (
  <Stack spacing={3}>
    {[1, 2, 3].map((i) => (
      <Flex key={i} align="center" gap={4} p={4} borderWidth="1px" borderRadius="xl">
        <Skeleton boxSize={10} borderRadius="lg" flexShrink={0} />
        <Box flex={1}>
          <Skeleton height="1rem" width="55%" mb={2} />
          <Skeleton height="0.75rem" width="35%" />
        </Box>
      </Flex>
    ))}
  </Stack>
);

// Versions from the Résumés section; one that neither prints nor has a file is skipped. With none, the complete résumé.
function ResumeOptions({ onDone }) {
  const resumes = useContent("resumes");
  const options = resumes.filter(({ title, print, url }) => title && (print !== false || url));
  const list = options.length ? options : [{ title: "Complete résumé" }];
  const [busy, setBusy] = useState(null);
  const [error, setError] = useState("");
  const iconBg = useColorModeValue("blackAlpha.50", "whiteAlpha.100");

  // Fetch what printing needs while the visitor is choosing
  useEffect(() => {
    loadContent(RESUME_SECTIONS);
  }, []);

  const print = async (resume, index) => {
    setBusy(index);
    setError("");
    try {
      await printResume(resume);
      onDone();
    } catch (err) {
      console.error("Résumé print failed:", err);
      setError("Couldn't prepare that résumé. Please try again.");
    } finally {
      setBusy(null);
    }
  };

  return (
    <Stack spacing={3}>
      {list.map((resume, index) => {
        const isFile = resume.print === false;
        const actionProps = isFile
          ? { as: "a", href: resume.url, target: "_blank", rel: "noreferrer", onClick: onDone }
          : { as: "button", type: "button", onClick: () => print(resume, index), disabled: busy !== null, "aria-busy": busy === index };
        return (
          <Flex
            key={`${index}-${resume.title}`}
            {...actionProps}
            role="group"
            w="100%"
            align="center"
            gap={4}
            p={4}
            textAlign="left"
            borderWidth="1px"
            borderRadius="xl"
            cursor="pointer"
            transition="transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease"
            _hover={{ transform: "translateY(-2px)", boxShadow: "md", borderColor: "teal.400" }}
            _focusVisible={{ outline: "2px solid", outlineColor: "teal.400", outlineOffset: "2px" }}
            _disabled={{ opacity: 0.6, cursor: "wait", transform: "none" }}
          >
            <Flex flexShrink={0} boxSize={10} align="center" justify="center" borderRadius="lg" bg={iconBg} color="teal.400">
              <Icon as={isFile ? FaFileDownload : FaPrint} />
            </Flex>
            <Box flex={1} minW={0}>
              <Text fontWeight="600">{resume.title}</Text>
              <Text fontSize="sm" opacity={0.65}>
                {isFile ? "Download file" : "Print or save as PDF"}
              </Text>
            </Box>
            {busy === index ? <Spinner size="sm" color="teal.400" /> : <Icon as={FaArrowRight} opacity={0.4} _groupHover={{ opacity: 1, color: "teal.400" }} />}
          </Flex>
        );
      })}
      {error && (
        <Text fontSize="sm" color="red.400" role="alert">
          {error}
        </Text>
      )}
    </Stack>
  );
}
ResumeOptions.propTypes = { onDone: PropTypes.func.isRequired };

// Opened by the résumé contact button (hooks/useResumePicker); loads the Résumés section only once opened
function ResumePicker({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg" scrollBehavior="inside">
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent mx={4} borderRadius="2xl">
        <ModalHeader pb={1}>Download résumé</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Text fontSize="sm" opacity={0.7} mb={4}>
            Pick the version that fits the role.
          </Text>
          <Suspense fallback={OptionsSkeleton}>
            <ResumeOptions onDone={onClose} />
          </Suspense>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
ResumePicker.propTypes = { isOpen: PropTypes.bool.isRequired, onClose: PropTypes.func.isRequired };

export default ResumePicker;
