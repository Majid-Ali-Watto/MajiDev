import { useState, useEffect } from "react";
import { Text, Box } from "@chakra-ui/react";
import useContent from "../hooks/useContent";

export default function AnimatedText() {
  const { roles } = useContent("settings");
  const [index, setIndex] = useState(0);
  const count = roles.length;
  const text = roles[index % count];

  useEffect(() => {
    if (count < 2) return;
    const intervalId = setInterval(() => setIndex((i) => (i + 1) % count), 3000);
    return () => clearInterval(intervalId);
  }, [count]);

  return (
    <Box
      className="typing-container"
      display="inline-block"
      overflow="hidden"
      whiteSpace={["normal", "nowrap"]}
      position="relative"
      fontSize={["md", "lg", "2xl"]}
      fontWeight="bold"
      textAlign="center"
      maxW="100%"
    >
      <Text
        as="span"
        className="typing-text"
        position="relative"
        display="inline-block"
      >
        {text}
      </Text>
    </Box>
  );
}
