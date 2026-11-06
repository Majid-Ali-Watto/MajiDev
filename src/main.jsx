/** @format */
import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./Root.jsx";
import "@fontsource-variable/fira-code"; // self-hosted, so no render-blocking request to Google Fonts
import "./style.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Root />
	</React.StrictMode>
);
