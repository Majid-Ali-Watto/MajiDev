import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link as ScrollLink } from "react-scroll";
import { navLinks } from "../assets/nav-links";
import { motion, AnimatePresence } from "framer-motion";

function Header() {
	const [activeLink, setActiveLink] = useState("home");
	const [burger, setBurger] = useState(false);
	const [path, setPath] = useState(null);

	const handleSetActive = (to) => {
		setActiveLink(to);
	};

	useEffect(() => {
		if (burger) setBurger(false);
	}, [path]);

	function openLink() {
		window.location.href = import.meta.env.VITE_SITE_URL;
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
						<motion.li key={index} whileHover={{ scale: 1.1 }} transition={{ duration: 0.2}}>
							<ScrollLink
								to={item.path}
								smooth={true}
								onSetActive={() => {
									handleSetActive(item.path);
									setPath(item.path);
								}}
								duration={800}
								spy={true}
								offset={-180}
								className={activeLink === item.path ? "active" : ""}
							>
								{item.pathTitle?.toUpperCase()}
							</ScrollLink>
						</motion.li>
					);
				})}
			</ul>
		);
	}

	return (
		<header className="header">
			<div className="logo">
				<h1 style={{ cursor: "pointer" }} onClick={openLink}>
					Majidev.
				</h1>
			</div>
			<nav className="nav-links">
				<Links />
			</nav>
			<div className="nav-links-burger">{!burger ? <GiHamburgerMenu className="burger-icon" onClick={() => setBurger(true)} /> : <AiOutlineClose className="close-icon" onClick={() => setBurger(false)} />}</div>
			<AnimatePresence>
				{burger && (
					<motion.div className="burger-links-menu" initial={{ opacity: 0, x: "110%", }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "-100%" }} transition={{ duration: 0.7 }}>
						<nav className="nav-links-burger-opened">
							<Links />
						</nav>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}

export default Header;
