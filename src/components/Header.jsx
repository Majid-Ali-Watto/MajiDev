/** @format */

import { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import "../style.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
function Header() {
	const [, setActiveLink] = useState("home");
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

	return (
		<header className="header">
			<div className="logo">
				<h1>
					MAJI<span style={{ fontWeight: "normal", color: "green" }}>D</span>ev
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

	function Links() {
		return (
			<ul>
				<li
					className="scroll-to-top"
					onClick={() => {
						scrollToTop();
						setPath("home");
					}}>
					Home
				</li>

				<li>
					<ScrollLink
						to="about"
						smooth={true}
						onSetActive={() => {
							handleSetActive();
							setPath("about");
						}}
						spy={true}
						offset={-50}>
						About
					</ScrollLink>
				</li>
				<li>
					<ScrollLink
						to="services"
						smooth={true}
						onSetActive={() => {
							handleSetActive();
							setPath("Services");
						}}
						spy={true}
						offset={-50}>
						Services
					</ScrollLink>
				</li>
				<li>
					<ScrollLink
						to="projects"
						smooth={true}
						onSetActive={() => {
							handleSetActive();
							setPath("Projects");
						}}
						spy={true}
						offset={-50}>
						Projects
					</ScrollLink>
				</li>
				<li>
					<ScrollLink
						to="contact"
						smooth={true}
						onSetActive={() => {
							handleSetActive();
							setPath("Contact");
						}}
						spy={true}
						offset={-50}>
						Contact
					</ScrollLink>
				</li>
				<li id="download-cv">
					<a href="/Majid-Ali-Resume-Updated.pdf" download={true}>
						Download Resume
					</a>
				</li>
				<li id="hire-me">
					<a href="https://www.upwork.com/freelancers/~018c214d3139f0f30e" target="_blank" rel="noreferrer">
						Hire Me
					</a>
				</li>
			</ul>
		);
	}
}

export default Header;
async function animateClick() {
	const scrollToTopElement = document.querySelector(".scroll-to-top");
	scrollToTopElement.classList.add("scroll-fade-in");
}
