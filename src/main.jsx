/** @format */
import React, { Suspense, lazy, useState, useCallback } from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript, extendTheme, useColorMode, IconButton, Box } from "@chakra-ui/react";

const theme = extendTheme({
	config: { initialColorMode: "dark", useSystemColorMode: false },
});
import { HelmetProvider } from "react-helmet-async";
import { FaSun, FaMoon } from "react-icons/fa";
import Welcome from "./components/Welcome.jsx";
import ErrorBoundary from "./ui/ErrorBoundary.jsx";
import "./style.css";

const App = lazy(() => import("./App.jsx"));

function ThemeToggleButton() {
	const { colorMode, toggleColorMode } = useColorMode();
	const [isAnimating, setIsAnimating] = useState(false);
	const overlayColor = colorMode === "light" ? "#1A202C" : "#FFFFFF";

	const handleToggle = useCallback(() => {
		setIsAnimating(true);
		// Let the cover animation play, then toggle theme midway
		setTimeout(() => {
			toggleColorMode();
		}, 1100);
		// Remove overlay after full animation
		setTimeout(() => {
			setIsAnimating(false);
		}, 2200);
	}, [toggleColorMode]);

	return (
		<>
			{/* Cover/Uncover overlay */}
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

function Root() {
	return (
		<HelmetProvider>
		<ChakraProvider theme={theme}>
			{/* Ensure color mode is applied instantly */}
			<ColorModeScript initialColorMode={theme.config.initialColorMode} />
			{/* Theme toggle button */}
			<ThemeToggleButton />
			{/* Error Boundary wraps the app */}
			<ErrorBoundary>
				{/* Suspense for lazy loading the app */}
				<Suspense fallback={<Welcome />}>
					<App />
				</Suspense>
			</ErrorBoundary>
		</ChakraProvider>
		</HelmetProvider>
	);
}

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Root />
	</React.StrictMode>
);
