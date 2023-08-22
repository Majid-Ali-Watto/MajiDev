/** @format */

import Header from "./components/Header";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import "../src/style.css";

function MainContent() {
	return (
		<div className="main-content">
			<img src="/MajiDev/majid.png" />
			<div className="intro">
				<span className="dev-name">Majid Ali</span>
				<span className="dev-proff">Web Developer/ React Native Apps Developer</span>
				<p className="intro-text">
					I am an experienced React Native and Vue.js developer, proficient in React, Node, Express, PostgreSQL, and MySQL. I began as a
					freelancer, creating web and Android apps. Now a Vue.js Developer at Teresol Pvt Ltd, I tackle cutting-edge projects with a
					problem-solving mindset, aiming for user-friendly, impactful solutions. I am committed to continuous growth and delivering quality
					software.
				</p>
			</div>
		</div>
	);
}

function App() {
	return (
		<div className="app">
			<div className="header-area">
				<Header />
			</div>
			<MainContent></MainContent>

			<About />
			<Services />
			<Projects />
			<Contact />
			<Footer owner="Majid's Portfolio" />
		</div>
	);
}

export default App;
