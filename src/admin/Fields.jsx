import { useContext, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormHelperText,
  FormLabel,
  Flex,
  GridItem,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  Select,
  SimpleGrid,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { FaArrowDown, FaArrowUp, FaEye, FaEyeSlash, FaImage, FaPlus, FaTrash, FaUpload } from "react-icons/fa";
import { emptyValue, optionLabel, optionValue } from "./adminSchemas";
import { AdminContent } from "./adminContent";
import { VISIBLE } from "../data/siteContent";
import { resizeImage } from "./resizeImage";

const focus = { focusBorderColor: "teal.400" };

const parseTags = (text) =>
  text
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

// Keeps the raw text locally so a trailing comma survives typing, but resyncs when the array changes from outside (reorder/delete).
function TagsInput({ value, onChange }) {
  const [text, setText] = useState(value.join(", "));
  const [seen, setSeen] = useState(value);
  if (value !== seen) {
    setSeen(value);
    if (JSON.stringify(parseTags(text)) !== JSON.stringify(value)) setText(value.join(", "));
  }
  return (
    <Input
      {...focus}
      value={text}
      onChange={(e) => {
        setText(e.target.value);
        onChange(parseTags(e.target.value));
      }}
    />
  );
}
TagsInput.propTypes = { value: PropTypes.arrayOf(PropTypes.string).isRequired, onChange: PropTypes.func.isRequired };

// Value is a data URL (or "" for none). The browser crops/resizes the chosen file before it is stored.
function ImageInput({ value, onChange, options, label }) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const pick = async (e) => {
    const file = e.target.files[0];
    e.target.value = ""; // allow picking the same file again
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      onChange(await resizeImage(file, options));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <HStack spacing={4} align="center">
      <Flex boxSize={options.size >= 256 ? 28 : 16} flexShrink={0} align="center" justify="center" overflow="hidden" borderRadius="xl" borderWidth="1px" borderStyle={value ? "solid" : "dashed"} bg="blackAlpha.50" _dark={{ bg: "whiteAlpha.50" }}>
        {value ? <Image src={value} alt={`${label} preview`} boxSize="100%" objectFit="cover" /> : <Icon as={FaImage} opacity={0.4} boxSize={6} />}
      </Flex>
      <Box>
        <HStack>
          <Button size="sm" leftIcon={<FaUpload />} colorScheme="teal" variant="outline" isLoading={busy} onClick={() => inputRef.current.click()}>
            {value ? "Replace" : "Upload"}
          </Button>
          {value && (
            <Button size="sm" variant="ghost" colorScheme="red" leftIcon={<FaTrash />} onClick={() => onChange("")}>
              Remove
            </Button>
          )}
        </HStack>
        <input ref={inputRef} type="file" accept="image/*" hidden aria-label={`Choose ${label}`} onChange={pick} />
        {error && (
          <Text mt={2} fontSize="xs" color="red.400" role="alert">
            {error}
          </Text>
        )}
      </Box>
    </HStack>
  );
}
ImageInput.propTypes = { value: PropTypes.string.isRequired, onChange: PropTypes.func.isRequired, options: PropTypes.shape({ size: PropTypes.number, mime: PropTypes.string }).isRequired, label: PropTypes.string.isRequired };

// Checkboxes over items of another section (see `choices` in adminSchemas), grouped under their `group` heading.
// Hidden items are offered too (marked), so hiding one keeps its tick. Ticked values whose item was renamed or deleted
// are not shown, and are dropped on the next change.
function ChoicesInput({ options, value, onChange }) {
  const all = options(useContext(AdminContent));
  const known = new Set(all.map((option) => option.value));
  const checked = value.filter((v) => known.has(v));
  const groups = [];
  for (const option of all) {
    const last = groups.at(-1);
    if (last && last.name === option.group) last.options.push(option);
    else groups.push({ name: option.group, options: [option] });
  }

  return (
    <Box borderWidth="1px" borderRadius="lg" p={3} maxH="20rem" overflowY="auto">
      <HStack justify="space-between" mb={2}>
        <Text fontSize="xs" opacity={0.7}>
          {checked.length} of {all.length} ticked
        </Text>
        <HStack spacing={1}>
          <Button size="xs" variant="ghost" onClick={() => onChange(all.map((option) => option.value))}>
            All
          </Button>
          <Button size="xs" variant="ghost" onClick={() => onChange([])}>
            None
          </Button>
        </HStack>
      </HStack>
      <CheckboxGroup colorScheme="teal" value={checked} onChange={onChange}>
        {groups.map(({ name, options: groupOptions }, i) => (
          <Box key={`${i}-${name}`} mb={2}>
            {name && (
              <Text fontSize="xs" fontWeight="700" textTransform="uppercase" letterSpacing="wide" opacity={0.6} mb={1}>
                {name}
              </Text>
            )}
            <SimpleGrid columns={{ base: 1, sm: 2 }} spacingX={4} spacingY={1}>
              {groupOptions.map((option) => (
                <Checkbox key={option.value} value={option.value} size="sm">
                  {option.label}
                  {option.hidden && (
                    <Text as="span" ml={1} fontSize="xs" opacity={0.6}>
                      (hidden)
                    </Text>
                  )}
                </Checkbox>
              ))}
            </SimpleGrid>
          </Box>
        ))}
      </CheckboxGroup>
    </Box>
  );
}
ChoicesInput.propTypes = { options: PropTypes.func.isRequired, value: PropTypes.arrayOf(PropTypes.string).isRequired, onChange: PropTypes.func.isRequired };

// `item` is the record this field belongs to, for fields whose requirement depends on its other fields
function Field({ field, value, onChange, item }) {
  const { type, label, hint, options, rows } = field;
  const required = field.required || field.requiredWhen?.(item);

  if (type === "list") return <ListField nested field={field} value={value ?? []} onChange={onChange} />;
  if (type === "boolean")
    return (
      <Checkbox colorScheme="teal" isChecked={!!value} onChange={(e) => onChange(e.target.checked)}>
        {label}
      </Checkbox>
    );

  let control;
  if (type === "textarea") control = <Textarea {...focus} rows={rows ?? 4} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />;
  else if (type === "select")
    control = (
      <Select {...focus} value={value ?? optionValue(options[0])} onChange={(e) => onChange(e.target.value)}>
        {options.map((option) => (
          <option key={optionValue(option)} value={optionValue(option)}>{optionLabel(option)}</option>
        ))}
      </Select>
    );
  else if (type === "image") control = <ImageInput value={value ?? ""} onChange={onChange} options={field.image} label={label} />;
  else if (type === "tags") control = <TagsInput value={value ?? []} onChange={onChange} />;
  else if (type === "choices") control = <ChoicesInput options={options} value={value ?? []} onChange={onChange} />;
  else control = <Input {...focus} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />;

  return (
    <FormControl isRequired={required}>
      <FormLabel fontSize="sm" fontWeight="600" mb={1}>
        {label}
      </FormLabel>
      {control}
      {hint && <FormHelperText fontSize="xs">{hint}</FormHelperText>}
    </FormControl>
  );
}
Field.propTypes = {
  field: PropTypes.object.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

const WIDE_TYPES = ["textarea", "tags", "list", "boolean", "image", "choices"];

// With `defaults` (names of fields using their built-in value) and `onDefaultChange(field, checked)`, each field gets a "Use default" checkbox that disables it.
export function Fields({ fields, value, onChange, defaults, onDefaultChange }) {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
      {fields.map((field) => {
        const isDefault = !!defaults?.includes(field.name);
        return (
          <GridItem key={field.name} colSpan={{ base: 1, md: WIDE_TYPES.includes(field.type) ? 2 : 1 }}>
            {/* A native disabled fieldset disables every input and button inside it */}
            <Box as="fieldset" disabled={isDefault} minW={0} opacity={isDefault ? 0.5 : 1} pointerEvents={isDefault ? "none" : "auto"}>
              <Field field={field} item={value} value={value[field.name]} onChange={(next) => onChange({ ...value, [field.name]: next })} />
            </Box>
            {onDefaultChange && (
              <Checkbox size="sm" mt={2} colorScheme="teal" isChecked={isDefault} onChange={(e) => onDefaultChange(field, e.target.checked)}>
                Use default
              </Checkbox>
            )}
          </GridItem>
        );
      })}
    </SimpleGrid>
  );
}
Fields.propTypes = {
  fields: PropTypes.array.isRequired,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  defaults: PropTypes.arrayOf(PropTypes.string),
  onDefaultChange: PropTypes.func,
};

// `field` = { label, fields, prepend?, itemTitle?, titleKey? }. Used for nested lists and, by SectionEditor, for a whole section.
// Every item has an eye toggle: a hidden item stays saved but the site leaves it out (see VISIBLE in data/siteContent).
export function ListField({ field, value, onChange, nested }) {
  const [open, setOpen] = useState([]);
  const titleOf = (item) => (field.itemTitle ? field.itemTitle(item) : item[field.titleKey ?? field.fields[0].name]) || "(untitled)";

  const hidden = (item) => item[VISIBLE] === false;

  const replace = (next) => {
    setOpen([]); // open panels are positional, so collapse after anything that shifts positions
    onChange(next);
  };
  const move = (i, step) => {
    const j = i + step;
    if (j < 0 || j >= value.length) return;
    const next = [...value];
    [next[i], next[j]] = [next[j], next[i]];
    replace(next);
  };
  const remove = (i) => {
    if (window.confirm(`Delete "${titleOf(value[i])}" for good?\n\nTo keep it but take it off the site, cancel and use the eye button to hide it.`)) replace(value.filter((_, k) => k !== i));
  };
  const toggleVisible = (i) => onChange(value.map((item, k) => (k === i ? { ...item, [VISIBLE]: hidden(item) } : item)));
  const add = () => {
    const item = emptyValue(field.fields);
    onChange(field.prepend ? [item, ...value] : [...value, item]);
    setOpen([field.prepend ? 0 : value.length]);
  };

  return (
    <Box
      p={nested ? 4 : 0}
      borderRadius="xl"
      borderWidth={nested ? "1px" : 0}
      borderStyle="dashed"
      bg={nested ? "blackAlpha.50" : "transparent"}
      _dark={nested ? { bg: "whiteAlpha.50" } : undefined}
    >
      <HStack justify="space-between" mb={3}>
        <HStack>
          <Text fontWeight="700" fontSize={nested ? "sm" : "md"}>
            {field.label}
          </Text>
          <Badge borderRadius="full" px={2} colorScheme="teal" variant="subtle">
            {value.length}
          </Badge>
        </HStack>
        <Button size="sm" leftIcon={<FaPlus />} colorScheme="teal" variant={nested ? "outline" : "solid"} onClick={add}>
          Add
        </Button>
      </HStack>

      {value.length === 0 && (
        <Text fontSize="sm" opacity={0.6} textAlign="center" py={6} borderWidth="1px" borderStyle="dashed" borderRadius="xl">
          Nothing here yet — click Add to create the first one.
        </Text>
      )}

      <Accordion allowMultiple index={open} onChange={setOpen}>
        {value.map((item, i) => (
          <AccordionItem
            key={i}
            mb={3}
            borderWidth="1px"
            borderRadius="xl"
            overflow="hidden"
            bg="chakra-body-bg"
            transition="box-shadow 0.2s ease"
            _hover={{ boxShadow: "md" }}
            _last={{ borderBottomWidth: "1px" }}
          >
            {({ isExpanded }) => (
              <>
                <HStack pr={2} spacing={1}>
                  <AccordionButton py={3} _hover={{ bg: "transparent" }} borderRadius="xl">
                    <Badge borderRadius="full" mr={3} px={2} colorScheme="purple" variant="subtle">
                      {i + 1}
                    </Badge>
                    <Text flex="1" textAlign="left" fontSize="sm" fontWeight="600" noOfLines={1} opacity={hidden(item) ? 0.5 : 1}>
                      {titleOf(item)}
                    </Text>
                    {hidden(item) && (
                      <Badge mr={2} colorScheme="orange" borderRadius="full" px={2}>
                        Hidden
                      </Badge>
                    )}
                    <AccordionIcon />
                  </AccordionButton>
                  <IconButton
                    aria-label={hidden(item) ? "Show on site" : "Hide from site"}
                    aria-pressed={hidden(item)}
                    title={hidden(item) ? "Hidden — click to show" : "Visible — click to hide"}
                    size="sm"
                    variant="ghost"
                    icon={hidden(item) ? <FaEyeSlash /> : <FaEye />}
                    onClick={() => toggleVisible(i)}
                  />
                  <IconButton aria-label="Move up" size="sm" variant="ghost" icon={<FaArrowUp />} isDisabled={i === 0} onClick={() => move(i, -1)} />
                  <IconButton aria-label="Move down" size="sm" variant="ghost" icon={<FaArrowDown />} isDisabled={i === value.length - 1} onClick={() => move(i, 1)} />
                  <IconButton aria-label="Delete" size="sm" colorScheme="red" variant="ghost" icon={<FaTrash />} onClick={() => remove(i)} />
                </HStack>
                {isExpanded && (
                  <AccordionPanel borderTopWidth="1px" pt={5} pb={6}>
                    <Fields fields={field.fields} value={item} onChange={(next) => onChange(value.map((existing, k) => (k === i ? next : existing)))} />
                  </AccordionPanel>
                )}
              </>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
}
ListField.propTypes = { field: PropTypes.object.isRequired, value: PropTypes.array.isRequired, onChange: PropTypes.func.isRequired, nested: PropTypes.bool };
