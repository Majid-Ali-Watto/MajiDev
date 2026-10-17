import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { Stack, IconButton } from "@chakra-ui/react";
import { FaArrowUp } from "react-icons/fa";
import { Routes, Route, Navigate, matchPath, useLocation } from "react-router-dom";
import Helmet_SEO from "./ui/Helmet";
import PropTypes from "prop-types";
import { loadContent } from "./hooks/useContent";
import PageNav from "./components/PageNav";
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

function HOC({ children, style, alt, page, fallback = CardGridSkeleton }) {
  const className = [page && "page", alt && "section-alt"].filter(Boolean).join(" ");
  return (
    // The section shell stays mounted while its content loads, so the skeleton fills the same card the content will
    <div style={style} className={className}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </div>
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
  const { pathname } = useLocation();

  // Each page starts at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // One page per header link (src/data/nav-links.js). `sections` are the content keys the page renders (hooks/useContent);
  // the page shows `fallback` until they and its code have loaded.
  const pages = [
    {
      path: "/",
      title: "Portfolio",
      sections: ["about", "contacts", "stats"],
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

      <Stack className="mainBody">
        <Routes>
          {pages.map(({ path, title, fallback, element }) => (
            <Route
              key={path}
              path={path}
              element={
                <HOC page alt={path !== "/"} fallback={fallback}>
                  <Helmet_SEO heading={title} />
                  {element}
                </HOC>
              }
            />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <PageNav />

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
