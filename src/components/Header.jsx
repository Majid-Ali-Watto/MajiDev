/** @format */
import { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import "../style.css";

function Header() {
	const [activeLink, setActiveLink] = useState("home");
	const [burger, setBurger] = useState(false);
	const [path, setPath] = useState(null);

	const handleSetActive = (to) => {
		setActiveLink(to);
	};

	useEffect(() => {
		setBurger((prev) => !prev);
	}, [path]);

	useEffect(() => {
		window.addEventListener("scroll", () => {
			if (window.scrollY < 200) {
				setActiveLink("home");
			}
		});
	}, []);

	async function scrollToTop() {
		await animateClick().then(() => {
			window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
		});
	}

	function Links() {
		return (
			<ul className="nav-links">
				<li
					className={`scroll-to-top ${activeLink === "home" ? "active" : ""}`}
					onClick={() => {
						scrollToTop();
						setPath("home");
					}}>
					<a>Home</a>
				</li>
				<li>
					<ScrollLink
						to="about"
						smooth={true}
						onSetActive={() => {
							handleSetActive("about");
							setPath("about");
						}}
						spy={true}
						offset={-50}
						className={activeLink === "about" ? "active" : ""}>
						About
					</ScrollLink>
				</li>
				<li>
					<ScrollLink
						to="services"
						smooth={true}
						onSetActive={() => {
							handleSetActive("services");
							setPath("services"); // Change "Services" to "services"
						}}
						spy={true}
						offset={-50}
						className={activeLink === "services" ? "active" : ""} // Change "Services" to "services"
					>
						Services
					</ScrollLink>
				</li>
				<li>
					<ScrollLink
						to="projects"
						smooth={true}
						onSetActive={() => {
							handleSetActive("projects");
							setPath("projects"); // Change "Projects" to "projects"
						}}
						spy={true}
						offset={-50}
						className={activeLink === "projects" ? "active" : ""} // Change "Projects" to "projects"
					>
						Projects
					</ScrollLink>
				</li>
				{/* <li>
					<ScrollLink
						to="contact"
						smooth={true}
						onSetActive={() => {
							handleSetActive("contact");
							setPath("contact"); // Change "Contact" to "contact"
						}}
						spy={true}
						offset={-50}
						className={activeLink === "contact" ? "active" : ""} // Change "Contact" to "contact"
					>
						Contact
					</ScrollLink>
				</li> */}
			</ul>
		);
	}

	async function animateClick() {
		const scrollToTopElement = document.querySelector(".scroll-to-top");
		scrollToTopElement.classList.add("scroll-fade-in");
	}

	return (
		<header className="header">
			<div className="logo">
				<h1>
					MAJI
					<span style={{ fontWeight: "normal", color: "#ff6600" }}>D</span>
					ev
				</h1>
			</div>
			<nav className="nav-links">{Links()}</nav>
			<div className="nav-links-burger">
				{!burger ? (
					<GiHamburgerMenu style={{ fontSize: "30px" }} onClick={() => setBurger(true)} />
				) : (
					<AiOutlineClose style={{ fontSize: "30px" }} onClick={() => setBurger(false)} />
				)}
			</div>
			{burger && (
				<div className="burger-links-menu">
					<nav className="nav-links-burger-opened">{Links()}</nav>
				</div>
			)}
		</header>
	);
}

export default Header;
