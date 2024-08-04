/** @format */

import "../src/style.css";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HireMe from "./components/Hire-Me";
import MyIntro from "./components/Intro";
import Projects from "./components/Projects";
import Services from "./components/Services";
const devName = import.meta.env.VITE_APP_DEV_NAME;

function App() {
	return (
		<div>
			<div className="header-area">
				<Header />
			</div>
			<MyIntro
				devName={devName}
				Contact={Contact}
			/>
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

			<Footer owner={devName?.split(" ").at(0) + "'s Portfolio"} />
		</div>
	);
}

export default App;
