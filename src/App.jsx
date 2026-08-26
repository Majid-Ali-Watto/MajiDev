import { lazy, Suspense, useEffect, useState } from "react";
import { Stack, IconButton } from "@chakra-ui/react";
import { FaArrowUp } from "react-icons/fa";
import Helmet_SEO from "./ui/Helmet";
import LazyRender from "./components/LazyRender";
import useFirebase from "./hooks/useFirebase";
import { contactLinks } from "./data/contact-links";
import PropTypes from "prop-types";
import { devFullName } from "./data/generic-data";
import {
  HeaderSkeleton,
  IntroSkeleton,
  TimelineSkeleton,
  SkillsSkeleton,
  CardGridSkeleton,
  FooterSkeleton,
  CompanySkeleton,
} from "./skeletons";

// Lazy-loaded components
// const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));
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
const devName = devFullName || "Majid Ali";

function HOC({ children, style, alt, fallback = CardGridSkeleton }) {
  return (
    <>
      <Suspense fallback={fallback}>
        <div style={style} className={alt ? "section-alt" : ""}>
        <LazyRender>{children}</LazyRender>
        </div>
      </Suspense>
    </>
  );
}
HOC.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  alt: PropTypes.bool,
  fallback: PropTypes.node,
};

function App() {
  const { uploads } = useFirebase();
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Update resume link when uploads change
  useEffect(() => {
    const resumeLink = uploads?.[0]?.resumeLink || import.meta.env.VITE_APP_RESUME_LINK;
    if (contactLinks[6]) contactLinks[6].href = resumeLink;
  }, [uploads]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const data = uploads?.[0];

  return (
    <>
      <Helmet_SEO heading="Portfolio" />
      <Suspense fallback={HeaderSkeleton}>
        <Header />
      </Suspense>

      <Stack className="mainBody">
        <HOC fallback={IntroSkeleton}>
          <MyIntro
            image={data?.imageBase64}
            devName={devName}
            Contact={Contact}
            about={data?.paragraph}
          />
        </HOC>

        {/* <HOC>
          <About about={data?.paragraph} />
        </HOC> */}

        <HOC style={{marginTop: "2rem"}} alt fallback={TimelineSkeleton}>
          <Experience />
        </HOC>

        <HOC style={{marginTop: "2rem"}} alt fallback={SkillsSkeleton}>
          <Skills />
        </HOC>

        <HOC style={{marginTop: "2rem"}} alt fallback={CardGridSkeleton}>
          <Services />
        </HOC>

        <HOC style={{marginTop: "2rem"}} fallback={CompanySkeleton}>
          <Company />
        </HOC>

        <HOC style={{marginTop: "2rem"}} alt fallback={CardGridSkeleton}>
          <Projects />
        </HOC>

        <HOC style={{marginTop: "2rem"}} alt fallback={CardGridSkeleton}>
          <Blogs />
        </HOC>

        <HOC style={{marginTop: "2rem"}} alt fallback={CardGridSkeleton}>
          <Packages />
        </HOC>

        <HOC style={{marginTop: "2rem"}} alt fallback={TimelineSkeleton}>
          <Education />
        </HOC>
        {/* <Divider mt="5" mb="5" /> */}

        <HOC fallback={FooterSkeleton}>
          {/* <Contact />
          <br /> */}
          <Footer owner={devName} />
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
    </>
  );
}

export default App;
