/** @format */
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link as ScrollLink } from "react-scroll";
import "../style.css";

function Header() {
	const [activeLink, setActiveLink] = useState("home");
	const [burger, setBurger] = useState(false);
	const [path, setPath] = useState(null);

	const handleSetActive = (to) => {
		setActiveLink(to);
	};

	useEffect(() => {
		if (burger) setBurger((prev) => !prev);
	}, [path]);
	const handleScroll = () => {
		if (window.scrollY < 200) {
			setActiveLink("home");
		}
	};
	function debounce(func, wait) {
		let timeout;
		return function (...args) {
			clearTimeout(timeout);
			timeout = setTimeout(() => func.apply(this, args), wait);
		};
	}

	useEffect(() => {
		const handleScrollDebounced = debounce(handleScroll, 100);
		window.addEventListener("scroll", handleScrollDebounced);
		return () => {
			window.removeEventListener("scroll", handleScrollDebounced);
		};
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
						duration={1000}
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
							setPath("services");
						}}
						spy={true}
						offset={-50}
						className={activeLink === "services" ? "active" : ""}>
						Services
					</ScrollLink>
				</li>
				<li>
					<ScrollLink
						to="projects"
						smooth={true}
						onSetActive={() => {
							handleSetActive("projects");
							setPath("projects");
						}}
						spy={true}
						offset={-50}
						className={activeLink === "projects" ? "active" : ""}>
						Projects
					</ScrollLink>
				</li>
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
				<h1 style={{ fontFamily: "serif" }}>
					Maji
					<strong style={{ fontWeight: "normal", color: "tomato" }}>D</strong>
					ev
				</h1>
			</div>
			<nav className="nav-links">{Links()}</nav>
			<div className="nav-links-burger">
				{!burger ? (
					<GiHamburgerMenu
						style={{ fontSize: "30px" }}
						onClick={() => setBurger(true)}
					/>
				) : (
					<AiOutlineClose
						style={{ fontSize: "30px" }}
						onClick={() => setBurger(false)}
					/>
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
