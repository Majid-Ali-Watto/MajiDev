import { motion, useReducedMotion } from "framer-motion";

// teal.400 → purple.500, the brand gradient used across the site
const style = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  height: 3,
  zIndex: 1100,
  pointerEvents: "none",
  transformOrigin: "left",
  background: "linear-gradient(to right, #38B2AC, #805AD5)",
  boxShadow: "0 0 10px rgba(56, 178, 172, 0.6)",
};

// A line that sweeps across the top of the window on each page change. App renders it keyed by path inside an
// AnimatePresence with initial={false}, so the first page load (which has its own welcome screen) shows none.
// (A plain motion.div: Chakra's Box would take framer's `transition` prop as CSS.)
export default function RouteProgressBar() {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;
  return (
    <motion.div
      aria-hidden
      style={style}
      initial={{ scaleX: 0, opacity: 1 }}
      animate={{ scaleX: [0, 0.7, 1], opacity: [1, 1, 0] }}
      transition={{ duration: 0.9, times: [0, 0.55, 1], ease: "easeOut" }}
    />
  );
}
