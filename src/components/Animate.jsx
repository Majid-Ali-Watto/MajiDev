import { useState, useEffect, useRef } from "react";
import { Text, Box } from "@chakra-ui/react";
import "../style.css";
export default function AnimatedText() {
	const [text, setText] = useState(import.meta.env.VITE_APP_DEV_POST);
	const currentIndex = useRef(0); // useRef to store the index

	useEffect(() => {
		const texts = [import.meta.env.VITE_APP_DEV_POST, "Freelancer"];
		const intervalId = setInterval(() => {
			currentIndex.current = (currentIndex.current + 1) % texts.length;
			setText(texts[currentIndex.current]);
		}, 3000);

		return () => clearInterval(intervalId); // Clean up the interval on component unmount
	}, []);

	return (
		<Box
			className="typing-container"
			display="inline-block"
			overflow="hidden"
			whiteSpace="nowrap"
			position="relative"
			fontSize="2xl"
			fontWeight="bold">
			<Text
				className="typing-text"
				as="span"
				// animation="fadeInOut 2s infinite"
				position="relative"
				display="inline-block">
				{text}
			</Text>
		</Box>
	);
}
