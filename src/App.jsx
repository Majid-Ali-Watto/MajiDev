import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { Stack, IconButton } from "@chakra-ui/react";
import { FaArrowUp } from "react-icons/fa";
import { Routes, Route, Navigate, matchPath, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Helmet_SEO from "./ui/Helmet";
import PropTypes from "prop-types";
import { loadContent } from "./hooks/useContent";
import PageNav from "./components/PageNav";
import RouteProgressBar from "./ui/RouteProgressBar";
import usePageMotion from "./hooks/usePageMotion";
import ResumePicker from "./components/ResumePicker";
import { ResumePickerContext } from "./hooks/useResumePicker";
import {
  HeaderSkeleton,
  IntroSkeleton,
  TimelineSkeleton,
  SkillsSkeleton,
  CardGridSkeleton,
  FooterSkeleton,
  CompanySkeleton,
  ContactSkeleton,
} from "./skeletons";

// Lazy-loaded components
// const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));
const ContactPage = lazy(() => import("./components/ContactPage"));
const Header = lazy(() => import("./components/Header"));
const MyIntro = lazy(() => import("./components/Intro"));
const Projects = lazy(() => import("./components/Projects"));
const Services = lazy(() => import("./components/Services"));
const Company = lazy(() => import("./components/Company"));
const Packages = lazy(() => import("./components/Packages"));
const Blogs = lazy(() => import("./components/Blogs"));
const Education = lazy(() => import("./components/Education"));
const Footer = lazy(() => import("./components/Footer"));
const Skills = lazy(() => import("./components/Skills"));
const Experience = lazy(() => import("./components/Experience"));

// Content fades in where its skeleton was (or with the page, when it was already loaded)
function Reveal({ children }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
}
Reveal.propTypes = { children: PropTypes.node.isRequired };

function HOC({ children, style, alt, page, fallback = CardGridSkeleton }) {
  const className = [page && "page", alt && "section-alt"].filter(Boolean).join(" ");
  const pageMotion = usePageMotion();
  const Shell = page ? motion.div : "div";
  return (
    // The section shell stays mounted while its content loads, so the skeleton fills the same card the content will.
    // A page's shell carries the route transition, so the page animates in first and then shows its skeleton if needed.
    <Shell style={style} className={className} {...(page && pageMotion)}>
      <Suspense fallback={fallback}>
        <Reveal>{children}</Reveal>
      </Suspense>
    </Shell>
  );
}
HOC.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  alt: PropTypes.bool,
  page: PropTypes.bool,
  fallback: PropTypes.node,
};

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [resumePickerOpen, setResumePickerOpen] = useState(false);
  const openResumePicker = useCallback(() => setResumePickerOpen(true), []);
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // One page per header link (src/data/nav-links.js). `sections` are the content keys the page renders (hooks/useContent);
  // the page shows `fallback` until they and its code have loaded.
  const pages = [
    {
      path: "/",
      title: "Portfolio",
      sections: ["about", "photo", "contacts", "stats"], // `photo` is fetched in parallel; only the photo waits for it
      fallback: IntroSkeleton,
      element: <MyIntro Contact={Contact} />,
    },
    { path: "/experience", title: "Experience", sections: ["experience"], fallback: TimelineSkeleton, element: <Experience /> },
    { path: "/skills", title: "Skills", sections: ["skills"], fallback: SkillsSkeleton, element: <Skills /> },
    { path: "/services", title: "Services", sections: ["services"], fallback: CardGridSkeleton, element: <Services /> },
    { path: "/venture", title: "Venture", sections: ["company"], fallback: CompanySkeleton, element: <Company /> },
    { path: "/projects", title: "Projects", sections: ["projects"], fallback: CardGridSkeleton, element: <Projects /> },
    { path: "/blogs", title: "Blogs", sections: ["blogs"], fallback: CardGridSkeleton, element: <Blogs /> },
    { path: "/packages", title: "Packages", sections: ["packages"], fallback: CardGridSkeleton, element: <Packages /> },
    { path: "/education", title: "Education", sections: ["education"], fallback: TimelineSkeleton, element: <Education /> },
    { path: "/contact", title: "Contact", sections: ["contacts"], fallback: ContactSkeleton, element: <ContactPage /> },
  ];

  // Start every request this page needs at once, alongside its code download, instead of one after another as components
  // suspend. Requests are shared and made once, so repeating this on every render is free. `settings` is the layout's.
  const page = pages.find(({ path }) => matchPath(path, pathname));
  loadContent(["settings", ...(page?.sections ?? [])]);

  return (
    <ResumePickerContext.Provider value={openResumePicker}>
      <Suspense fallback={HeaderSkeleton}>
        <Header />
      </Suspense>

      <AnimatePresence initial={false}>
        <RouteProgressBar key={pathname} />
      </AnimatePresence>

      <Stack className="mainBody">
        {/* Page transitions: keyed by path, the leaving page plays its exit (Routes keeps rendering its old location meanwhile),
            then the window returns to the top and the next page plays its entrance. Its data fetch started at the click
            (loadContent above), so a page whose data is still on its way shows its skeleton once it is in. */}
        <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
          <Routes location={location} key={pathname}>
            {pages.map(({ path, title, fallback, element }) => (
              <Route
                key={path}
                path={path}
                element={
                  <>
                    <HOC page alt={path !== "/"} fallback={fallback}>
                      <Helmet_SEO heading={title} />
                      {element}
                    </HOC>
                    <PageNav />
                  </>
                }
              />
            ))}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>

        <HOC fallback={FooterSkeleton}>
          <Footer />
        </HOC>
      </Stack>

      {showScrollTop && (
        <IconButton
          icon={<FaArrowUp />}
          aria-label="Back to top"
          position="fixed"
          bottom="16"
          right="4"
          zIndex="10"
          isRound
          size="sm"
          colorScheme="teal"
          shadow="lg"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />
      )}

      <ResumePicker isOpen={resumePickerOpen} onClose={() => setResumePickerOpen(false)} />
    </ResumePickerContext.Provider>
  );
}

export default App;
