import { lazy, Suspense } from "react";
import { Progress, Divider, Stack } from "@chakra-ui/react";
import Helmet_SEO from "./generic-components/Helmet";
import LazyRender from "./LazyRender";
import useFirebase from "./hooks/useFireBase";
import { contactLinks } from "./assets/contact-links";
import PropTypes from "prop-types";
import { devFullName } from "./assets/generic-data";

// Lazy-loaded components
const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));
const Header = lazy(() => import("./components/Header"));
const MyIntro = lazy(() => import("./components/Intro"));
const Projects = lazy(() => import("./components/Projects"));
const Services = lazy(() => import("./components/Services"));
const Packages = lazy(() => import("./components/Packages"));
const Blogs = lazy(() => import("./components/Blogs"));
const Education = lazy(() => import("./components/Education"));
const Footer = lazy(() => import("./components/Footer"));
const Skills = lazy(() => import("./components/Skills"));
const Experience = lazy(() => import("./components/Experience"));

const devName = devFullName || "Majid Ali";

const ProgressFallback = (
  <Progress size="lg" colorScheme="teal" isIndeterminate />
);

function HOC({ children }) {
  return (
    <>
      <Suspense fallback={ProgressFallback}>
        <Helmet_SEO heading="Portfolio" />
        <LazyRender>{children}</LazyRender>
      </Suspense>
      {/* <Divider orientation="horizontal" /> */}
    </>
  );
}
HOC.propTypes = {
  children: PropTypes.node.isRequired,
};

function App() {
  const { isLoading, uploads } = useFirebase();
  console.log("Uploads:", uploads);
  // Fallback for resume link
  contactLinks[6].href =
    uploads?.[0]?.resumeLink || import.meta.env.VITE_APP_RESUME_LINK;

  return (
    <>
      <Helmet_SEO heading="Portfolio" />
      <Suspense fallback={ProgressFallback}>
        <Header />
      </Suspense>

      <Stack className="mainBody">
        <HOC>
          <MyIntro
            image={uploads?.[0]?.imageBase64}
            devName={devName}
            Contact={Contact}
          />
        </HOC>

        <HOC>
          <About about={uploads?.[0]?.paragraph} />
        </HOC>

        <HOC>
          <Experience />
        </HOC>

        <HOC>
          <Skills />
        </HOC>

        <HOC>
          <Services />
        </HOC>

        <HOC>
          <Projects />
        </HOC>

        <HOC>
          <Blogs />
        </HOC>

        <HOC>
          <Packages />
        </HOC>

        <HOC>
          <Education />
        </HOC>
        <Divider mt="3" />

        <HOC>
          <Contact />
          <br />
          <Footer owner={devName} />
        </HOC>
      </Stack>
    </>
  );
}

export default App;
