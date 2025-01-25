/** @format */
import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript, useColorMode, IconButton, Box } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";
import Welcome from "./components/Welcome.jsx";
import "./style.css";

const App = lazy(() => import("./App.jsx"));

function ThemeToggleButton() {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Box position="fixed" bottom="1rem" right="1rem" zIndex="1000">
			<IconButton aria-label="Toggle Theme" icon={colorMode === "light" ? <FaMoon /> : <FaSun />} isRound size="sm" colorScheme="teal" onClick={toggleColorMode} boxShadow="md" _hover={{ boxShadow: "lg" }} />
		</Box>
	);
}

function Root() {
	return (
		<ChakraProvider>
			{/* Ensure color mode is applied instantly */}
			<ColorModeScript />
			{/* Theme toggle button */}
			<ThemeToggleButton />
			{/* Suspense for lazy loading the app */}
			<Suspense fallback={<Welcome />}>
				<App />
			</Suspense>
		</ChakraProvider>
	);
}

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Root />
	</React.StrictMode>
);
