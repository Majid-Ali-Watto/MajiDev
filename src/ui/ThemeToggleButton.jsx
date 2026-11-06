import { useCallback, useEffect, useRef, useState } from "react";
import { Box, IconButton, useColorMode, usePrefersReducedMotion } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import { saveChosenColorMode } from "../config/colorMode";

// Cover/uncover animation (style.css .theme-transition-overlay): the theme switches while the screen is covered
const COVERED_AT = 1100;
const ANIMATION_MS = 2200;

export default function ThemeToggleButton() {
	const { colorMode, toggleColorMode } = useColorMode();
	const reduceMotion = usePrefersReducedMotion();
	const [isAnimating, setIsAnimating] = useState(false);
	const timers = useRef([]);
	const overlayColor = colorMode === "light" ? "#1A202C" : "#FFFFFF";

	useEffect(() => {
		const pending = timers;
		return () => pending.current.forEach(clearTimeout);
	}, []);

	const handleToggle = useCallback(() => {
		const toggle = () => {
			saveChosenColorMode(colorMode === "light" ? "dark" : "light");
			toggleColorMode();
		};
		if (reduceMotion) return toggle();
		// One toggle per animation: a second click while it plays would switch the theme back
		if (isAnimating) return;
		setIsAnimating(true);
		timers.current = [setTimeout(toggle, COVERED_AT), setTimeout(() => setIsAnimating(false), ANIMATION_MS)];
	}, [colorMode, toggleColorMode, reduceMotion, isAnimating]);

	return (
		<>
			{isAnimating && (
				<Box
					position="fixed"
					top={0}
					left={0}
					right={0}
					bottom={0}
					zIndex={9999}
					bg={overlayColor}
					pointerEvents="none"
					className="theme-transition-overlay"
				/>
			)}
			<Box position="fixed" bottom="1rem" right="1rem" zIndex="10000">
				<IconButton
					aria-label="Toggle Theme"
					icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
					isRound
					size="sm"
					colorScheme="teal"
					onClick={handleToggle}
					boxShadow="md"
					_hover={{ boxShadow: "lg" }}
				/>
			</Box>
		</>
	);
}
