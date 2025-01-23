import { useState, useEffect, useRef } from "react";
import { Text, Box } from "@chakra-ui/react";

export default function AnimatedText() {
	const [text, setText] = useState(import.meta.env.VITE_APP_DEV_POST);
	const currentIndex = useRef(0); // useRef to store the index

	useEffect(() => {
		const texts = [import.meta.env.VITE_APP_DEV_POST, "Freelancer"];
		const intervalId = setInterval(() => {
			currentIndex.current = (currentIndex.current + 1) % texts.length;
			setText(texts[currentIndex.current]);
		}, 4000); // Change text every 4 seconds

		return () => clearInterval(intervalId); // Clean up the interval on component unmount
	}, []);

	return (
		<Box className="typing-container" display="inline-block" overflow="hidden" whiteSpace="nowrap" position="relative" fontSize="2xl" fontWeight="bold">
			<Text as="span" className="typing-text" position="relative" display="inline-block">
				{text}
			</Text>
		</Box>
	);
}
