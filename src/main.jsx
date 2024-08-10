/** @format */
import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import Welcome from "./components/Welcome.jsx";

// Use React.lazy to lazy load the App component
const App = lazy(() => import("./App.jsx"));

function Root() {
	return (
		<ChakraProvider>
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
