/** @format */

import Header from "./components/Header";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import "../src/style.css";
import HireMe from "./components/Hire-Me";

function MainContent() {
	return (
		<div className="main-content">
			<img src="/majid2.png" />

			<div className="intro">
				<span className="dev-name">Majid Ali</span>
				<span className="dev-proff">Full Stack Web Developer</span>
				<Contact />
			</div>
		</div>
	);
}

function App() {
	return (
		<div>
			<div className="header-area">
				<Header />
			</div>
			<MainContent />
			<div className="mainBody">
				<About />
				<Services />
				<Projects />
			</div>
			<br />
			<div className="extra-section">
				<HireMe />
				<br />
				<Contact />
				<br />

			</div>

			<Footer owner="Majid's Portfolio" />
		</div>
	);
}

export default App;
