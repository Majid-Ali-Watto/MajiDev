/** @format */
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link as ScrollLink } from "react-scroll";
import "../style.css";
import { navLinks } from "../assets/nav-links";
import { Image } from "@chakra-ui/react";
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
	function openLink() {
		const url = "https://majidev.netlify.app/";
		window.location.href = url;
	}
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

	function Links() {
		return (
			<ul className="nav-links">
				{navLinks.map((item, index) => {
					return (
						<li key={index}>
							<ScrollLink
								to={item.path}
								smooth={true}
								onSetActive={() => {
									handleSetActive(item.path);
									setPath(item.path);
								}}
								duration={1000}
								spy={true}
								offset={-180}
								className={activeLink === item.path ? "active" : ""}>
								{item.pathTitle}
							</ScrollLink>
						</li>
					);
				})}
			</ul>
		);
	}

	return (
		<header className="header">
			<div className="logo">
				{/* <h1
					style={{ fontFamily: "serif", cursor: "pointer" }}
					onClick={openLink}>
					<strong style={{ fontWeight: "normal" }}>M.A</strong>
				</h1> */}
				<Image
					style={{ cursor: "pointer" }}
					src="/soft-dev.png"
					alt="M.A"
					borderRadius="md"
					height="3rem"
					onClick={openLink}
				/>
			</div>
			<nav className="nav-links">{Links()}</nav>
			<div className="nav-links-burger">
				{!burger ? (
					<GiHamburgerMenu
						className="burger-icon"
						onClick={() => setBurger(true)}
					/>
				) : (
					<AiOutlineClose
						className="close-icon"
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
