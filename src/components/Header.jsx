import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiArrowRight } from "react-icons/fi";
import { NavLink, useLocation } from "react-router-dom";
import { navLinks } from "../data/nav-links";
import useContent from "../hooks/useContent";
import { motion, AnimatePresence } from "framer-motion";

function Header() {
  const { brandName } = useContent("settings");
  const [burger, setBurger] = useState(false);
  const { pathname } = useLocation();

  // Close the mobile menu after navigating
  useEffect(() => {
    setBurger(false);
  }, [pathname]);

  function openLink() {
    window.location.href = import.meta.env.VITE_SITE_URL;
  }

  function Links() {
    return (
      <ul className="nav-links">
        {navLinks.map((item, index) => {
          return (
            <motion.li
              key={index}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <NavLink to={item.path} end>
                {item.pathTitle}
              </NavLink>
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
          {brandName}
        </h1>
      </div>
      <nav className="nav-links">
        <Links />
      </nav>
      <button
        type="button"
        className="nav-links-burger"
        aria-label={burger ? "Close menu" : "Open menu"}
        aria-expanded={burger}
        aria-controls="mobile-menu"
        onClick={() => setBurger((open) => !open)}
      >
        {burger ? (
          <AiOutlineClose className="close-icon" />
        ) : (
          <GiHamburgerMenu className="burger-icon" />
        )}
      </button>
      <AnimatePresence>
        {burger && (
          <motion.div
            className="burger-links-menu"
            initial={{ opacity: 0, x: "110%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ duration: 0.7 }}
          >
            <nav id="mobile-menu" aria-label="Main">
              <ul className="mobile-menu-list">
                {navLinks.map((item, index) => (
                  <li key={item.path} className="mobile-menu-item">
                    <NavLink to={item.path} end className="mobile-menu-link">
                      <span className="mobile-menu-index">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {item.pathTitle}
                      <FiArrowRight className="mobile-menu-arrow" aria-hidden />
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
