/** @format */
import React, { Suspense, lazy, useState, useCallback } from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript, extendTheme, useColorMode, IconButton, Box } from "@chakra-ui/react";

const theme = extendTheme({
	config: { initialColorMode: getCachedDefaultTheme(), useSystemColorMode: false },
});
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";
import Welcome from "./components/Welcome.jsx";
import { colorModeManager, getCachedDefaultTheme, saveChosenColorMode } from "./config/colorMode.js";
import ErrorBoundary from "./ui/ErrorBoundary.jsx";
import "./style.css";

const App = lazy(() => import("./App.jsx"));
const AdminPage = lazy(() => import("./admin/AdminPage.jsx"));
const SiteSettings = lazy(() => import("./ui/SiteSettings.jsx"));

function ThemeToggleButton() {
	const { colorMode, toggleColorMode } = useColorMode();
	const [isAnimating, setIsAnimating] = useState(false);
	const overlayColor = colorMode === "light" ? "#1A202C" : "#FFFFFF";

	const handleToggle = useCallback(() => {
		setIsAnimating(true);
		// Let the cover animation play, then toggle theme midway
		setTimeout(() => {
			saveChosenColorMode(colorMode === "light" ? "dark" : "light");
			toggleColorMode();
		}, 1100);
		// Remove overlay after full animation
		setTimeout(() => {
			setIsAnimating(false);
		}, 2200);
	}, [colorMode, toggleColorMode]);

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
		<BrowserRouter>
		<HelmetProvider>
		<ChakraProvider theme={theme} colorModeManager={colorModeManager}>
			{/* Ensure color mode is applied instantly */}
			<ColorModeScript initialColorMode={theme.config.initialColorMode} />
			<Suspense fallback={null}>
				<SiteSettings />
			</Suspense>
			{/* Theme toggle button */}
			<ThemeToggleButton />
			{/* Error Boundary wraps the app */}
			<ErrorBoundary>
				{/* Suspense for lazy loading the app */}
				<Suspense fallback={<Welcome />}>
					<Routes>
						<Route path="/admin" element={<AdminPage />} />
						{/* Every other path is a portfolio page; App owns those routes */}
						<Route path="/*" element={<App />} />
					</Routes>
				</Suspense>
			</ErrorBoundary>
		</ChakraProvider>
		</HelmetProvider>
		</BrowserRouter>
	);
}

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Root />
	</React.StrictMode>
);
