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
import { Helmet } from "react-helmet";

const devName = import.meta.env.VITE_APP_DEV_NAME;

function App() {
	return (
		<div>
			<Helmet>
				<title>{devName ? `${devName} - Portfolio` : "Portfolio"}</title>
				<meta
					name="description"
					content={`Welcome to Majid Ali's portfolio. Explore projects, services, and more.`}
				/>
				<meta
					name="keywords"
					content="Majid Ali's portfolio,Majid Ali,Vue JS Developer, React JS Developer, Front End Developer, Portfolio, Web Developer, Software Engineer, Projects, Services"
				/>
				<meta
					name="author"
					content={devName}
				/>

				{/* Open Graph Meta Tags */}
				<meta
					property="og:title"
					content={"Majid Ali - Portfolio"}
				/>
				<meta
					property="og:description"
					content={`Welcome to Majid Ali's portfolio. Explore projects, services, and more.`}
				/>
				<meta
					property="og:image"
					content="/public/soft-dev.png"
				/>
				<meta
					property="og:url"
					content={window.location.href}
				/>
				<meta
					property="og:type"
					content="website"
				/>

				{/* Twitter Card Meta Tags */}
				<meta
					name="twitter:card"
					content="summary_large_image"
				/>
				<meta
					name="twitter:title"
					content="Majid Ali - Portfolio"
				/>
				<meta
					name="twitter:description"
					content={`Welcome to Majid Ali's portfolio. Explore projects, services, and more.`}
				/>
				<meta
					name="twitter:image"
					content="/public/soft-dev.png"
				/>
			</Helmet>

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
