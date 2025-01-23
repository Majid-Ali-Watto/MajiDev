/** @format */
import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, useColorMode, IconButton, Box } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa"; // Import icons for light and dark modes
import Welcome from "./components/Welcome.jsx";
import "./style.css";

// Use React.lazy to lazy load the App component
const App = lazy(() => import("./App.jsx"));

function ThemeToggleButton() {
	const { colorMode, toggleColorMode } = useColorMode(); // Access Chakra's color mode

	return (
		<Box position="fixed" bottom="1rem" right="1rem" zIndex="1000">
			<IconButton aria-label="Toggle Theme" icon={colorMode === "light" ? <FaMoon /> : <FaSun />} isRound={true} size="md" colorScheme="teal" onClick={toggleColorMode} boxShadow="md" _hover={{ boxShadow: "lg" }} />
		</Box>
	);
}

function Root() {
	return (
		<ChakraProvider>
			<ThemeToggleButton />
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
