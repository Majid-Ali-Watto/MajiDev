import { Suspense, lazy } from "react";
import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome.jsx";
import { colorModeManager, getCachedDefaultTheme } from "./config/colorMode.js";
import ErrorBoundary from "./ui/ErrorBoundary.jsx";
import ThemeToggleButton from "./ui/ThemeToggleButton.jsx";

const theme = extendTheme({
	config: { initialColorMode: getCachedDefaultTheme(), useSystemColorMode: false },
});

const App = lazy(() => import("./App.jsx"));
const AdminPage = lazy(() => import("./admin/AdminPage.jsx"));
const SiteSettings = lazy(() => import("./ui/SiteSettings.jsx"));

// Providers and the top-level routes: /admin, and every other path to the portfolio (App owns those routes)
export default function Root() {
	return (
		<BrowserRouter>
			<HelmetProvider>
				<ChakraProvider theme={theme} colorModeManager={colorModeManager}>
					{/* Ensure color mode is applied instantly */}
					<ColorModeScript initialColorMode={theme.config.initialColorMode} />
					<Suspense fallback={null}>
						<SiteSettings />
					</Suspense>
					<ThemeToggleButton />
					<ErrorBoundary>
						<Suspense fallback={<Welcome />}>
							<Routes>
								<Route path="/admin" element={<AdminPage />} />
								<Route path="/*" element={<App />} />
							</Routes>
						</Suspense>
					</ErrorBoundary>
				</ChakraProvider>
			</HelmetProvider>
		</BrowserRouter>
	);
}
