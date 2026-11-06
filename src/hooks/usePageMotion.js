import { useReducedMotion } from "framer-motion";

const EASE_OUT = [0.22, 1, 0.36, 1];

// Route change (App's AnimatePresence): the leaving page lifts and blurs away quickly, then the next one rises into focus.
// Ends on `filter: none`: any filter, even blur(0), would make the page the containing block of position: fixed children.
const PAGE = {
  initial: { opacity: 0, y: 24, scale: 0.985, filter: "blur(6px)" },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: EASE_OUT },
    transitionEnd: { filter: "none" },
  },
  exit: { opacity: 0, y: -12, scale: 0.985, filter: "blur(4px)", transition: { duration: 0.2, ease: "easeIn" } },
};

// Visitors who ask for less motion get a short crossfade only
const REDUCED = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
};

// Props for every motion element that makes up a page, so they leave and arrive together
export default function usePageMotion() {
  return { variants: useReducedMotion() ? REDUCED : PAGE, initial: "initial", animate: "enter", exit: "exit" };
}
