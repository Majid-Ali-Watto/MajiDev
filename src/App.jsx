/** @format */

import Header from "./components/Header";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
// import Contact from "./components/Contact";
import Footer from "./components/Footer";
import "../src/style.css";
import { FaSquareFacebook, FaInstagram, FaLinkedin, FaMedium, FaGithub, FaEnvelope, FaWhatsapp } from "react-icons/fa6";

function MainContent() {
	return (
		<div className="main-content">
			<img src="/MajiDev/majid.png" />
			<div className="intro">
				<span className="dev-name">Majid Ali</span>
				<span className="dev-proff">Full Stack Web Apps Developer</span>
				<div className="top-links">
					<a
						href="https://www.linkedin.com/in/majid-ali-074b97245/"
						target="_blank"
						rel="noreferrer">
						<abbr title="LinkedIn">
							<FaLinkedin style={{ fontSize: "25px", color: "blue", marginRight: "10px" }} />
						</abbr>
					</a>
					<a
						href="https://github.com/Majid-Ali-Watto"
						target="_blank"
						rel="noreferrer">
						<abbr title="Github">
							<FaGithub style={{ fontSize: "25px", color: "black", marginRight: "10px" }} />
						</abbr>
					</a>
					<a
						href="https://www.facebook.com/groups/246606200063950/?ref=share_group_link"
						target="_blank"
						rel="noreferrer">
						<abbr title="Facebook">
							<FaSquareFacebook style={{ fontSize: "25px", color: "blue", marginRight: "10px" }} />
						</abbr>
					</a>
					<a
						href="https://instagram.com/majid_ali_wattu?utm_source=qr&igshid=ZDc4ODBmNjlmNQ%3D%3D"
						target="_blank"
						rel="noreferrer">
						<abbr title="Instagram">
							<FaInstagram style={{ fontSize: "25px", color: "black", marginRight: "10px" }} />
						</abbr>
					</a>
					<a
						href="mailto:majidaliqau@gmail.com"
						target="_blank"
						rel="noreferrer">
						<abbr title="Email">
							<FaEnvelope style={{ fontSize: "25px", color: "red", marginRight: "10px" }} />
						</abbr>
					</a>
					<a
						href="https://wa.me/923275065850"
						target="_blank"
						rel="noreferrer">
						<abbr title="Whatsapp">
							<FaWhatsapp style={{ fontSize: "25px", color: "green", marginRight: "10px" }} />
						</abbr>
					</a>

					<a
						href="https://medium.com/@majid.teresol"
						target="_blank"
						rel="noreferrer">
						<abbr title="Medium">
							<FaMedium style={{ fontSize: "25px", color: "black", marginRight: "10px" }} />
						</abbr>
					</a>
				</div>
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
			{/* <div> */}
			<MainContent />
			{/* </div> */}
			<div className="mainBody">
				<About />
				<Services />
				<Projects />
				{/* <Contact /> */}
			</div>

			<Footer owner="Majid's Portfolio" />
		</div>
	);
}

export default App;
