import { useState, useEffect, useRef } from "react";
import { Text, Box } from "@chakra-ui/react";
import { devPost } from "../data/generic-data";

const roles = [
  devPost,
  "Vue.js / Nuxt.js / React Specialist",
  "Python & FastAPI Engineer",
  "Microservices & DevOps",
];

export default function AnimatedText() {
  const [text, setText] = useState(roles[0]);
  const currentIndex = useRef(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      currentIndex.current = (currentIndex.current + 1) % roles.length;
      setText(roles[currentIndex.current]);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

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
