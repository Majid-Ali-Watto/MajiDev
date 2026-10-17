import { useState } from "react";
import PropTypes from "prop-types";
import { Alert, AlertDescription, AlertIcon, Badge, Box, Button, Checkbox, Flex, Heading, HStack, Icon, Stack, Text, useToast } from "@chakra-ui/react";
import { FaCheckCircle, FaSave, FaUndo } from "react-icons/fa";
import { Fields, ListField } from "./Fields";
import { findError } from "./adminSchemas";
import { siteContent } from "../data/siteContent";

const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

export default function SectionEditor({ section, saved, isBuiltIn, useBuiltIn: savedUseBuiltIn, defaultFields: savedDefaults, onSave }) {
  const [value, setValue] = useState(saved);
  const [useBuiltIn, setUseBuiltIn] = useState(savedUseBuiltIn);
  const [defaults, setDefaults] = useState(savedDefaults);
  const [saving, setSaving] = useState(false);
  const toast = useToast();
  const dirty = !same(value, saved) || useBuiltIn !== savedUseBuiltIn || !same([...defaults].sort(), [...savedDefaults].sort());
  const isList = section.kind === "list";

  // Ticking "Use default" shows the built-in value in the field (About has none, so it empties); unticking leaves it there to edit.
  const toggleDefault = (field, checked) => {
    setDefaults(checked ? [...defaults, field.name] : defaults.filter((name) => name !== field.name));
    if (checked) setValue({ ...value, [field.name]: siteContent[section.key][field.name] });
  };

  const save = async () => {
    const error = isList
      ? !useBuiltIn && value.map((item, i) => findError(section.fields, item, `${section.label} #${i + 1} → `)).find(Boolean)
      : findError(section.fields.filter(({ name }) => !defaults.includes(name)), value);
    if (error) return toast({ title: error, status: "warning", isClosable: true });
    setSaving(true);
    try {
      await onSave(isList ? value : Object.fromEntries(Object.entries(value).filter(([name]) => !defaults.includes(name))), useBuiltIn);
      toast({ title: `${section.label} saved`, description: "Live on the next page load.", status: "success" });
    } catch (err) {
      toast({ title: "Save failed", description: err.code === "permission-denied" ? "This account isn't allowed to write (check firestore.rules)." : err.message, status: "error", isClosable: true });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Stack spacing={6}>
      <Flex align="center" gap={4}>
        <Flex boxSize={12} flexShrink={0} align="center" justify="center" borderRadius="xl" color="white" bgGradient="linear(to-br, teal.400, purple.500)" fontSize="xl">
          <Icon as={section.icon} />
        </Flex>
        <Box minW={0}>
          <HStack>
            <Heading as="h2" size="md">
              {section.label}
            </Heading>
            {isBuiltIn && (
              <Badge colorScheme="orange" borderRadius="full" px={2}>
                Built-in
              </Badge>
            )}
          </HStack>
          <Text fontSize="sm" opacity={0.7} textAlign="left">
            {section.description}
          </Text>
        </Box>
      </Flex>

      {isBuiltIn && (
        <Alert status="info" borderRadius="xl" variant="left-accent">
          <AlertIcon />
          <AlertDescription fontSize="sm">You&apos;re looking at the built-in content. The first save publishes it to Firestore, and the site uses that from then on.</AlertDescription>
        </Alert>
      )}

      {isList ? (
        <>
          <Box p={4} borderWidth="1px" borderRadius="xl">
            <Checkbox colorScheme="teal" isChecked={useBuiltIn} onChange={(e) => setUseBuiltIn(e.target.checked)}>
              Show default data
            </Checkbox>
            <Text mt={1} ml={6} fontSize="xs" opacity={0.7} textAlign="left">
              The site shows the built-in {section.label.toLowerCase()} and ignores the list below. What you saved is kept and comes back when you untick this.
            </Text>
          </Box>
          {/* A native disabled fieldset disables every input and button inside it */}
          <Box as="fieldset" disabled={useBuiltIn} minW={0} opacity={useBuiltIn ? 0.5 : 1} pointerEvents={useBuiltIn ? "none" : "auto"}>
            <ListField field={section} value={value} onChange={setValue} />
          </Box>
        </>
      ) : (
        <Fields fields={section.fields} value={value} onChange={setValue} defaults={defaults} onDefaultChange={toggleDefault} />
      )}

      <Flex
        position="sticky"
        bottom={4}
        zIndex={1}
        align="center"
        gap={3}
        wrap="wrap"
        p={3}
        pr={{ base: 3, md: 16 }}
        bg="chakra-body-bg"
        borderWidth="1px"
        borderRadius="xl"
        boxShadow="lg"
      >
        <Button colorScheme="teal" leftIcon={<FaSave />} onClick={save} isLoading={saving} isDisabled={!dirty && !isBuiltIn}>
          Save {section.label}
        </Button>
        <Button variant="ghost" leftIcon={<FaUndo />} onClick={() => { setValue(saved); setUseBuiltIn(savedUseBuiltIn); setDefaults(savedDefaults); }} isDisabled={!dirty || saving}>
          Discard
        </Button>
        <HStack ml="auto" fontSize="sm" color={dirty ? "orange.400" : "green.400"}>
          <Icon as={FaCheckCircle} display={dirty ? "none" : "inline"} />
          <Text fontSize="sm">{dirty ? "Unsaved changes" : isBuiltIn ? "Not published yet" : "All changes saved"}</Text>
        </HStack>
      </Flex>
    </Stack>
  );
}
SectionEditor.propTypes = {
  section: PropTypes.object.isRequired,
  saved: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  isBuiltIn: PropTypes.bool,
  useBuiltIn: PropTypes.bool.isRequired,
  defaultFields: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSave: PropTypes.func.isRequired,
};
