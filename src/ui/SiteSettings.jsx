import { useEffect } from "react";
import { useColorMode } from "@chakra-ui/react";
import useContent from "../hooks/useContent";
import { cacheDefaultTheme, hasChosenColorMode } from "../config/colorMode";

// Renders nothing. Applies the admin-managed site settings: default theme (unless the visitor picked one) and favicon.
export default function SiteSettings() {
  const { defaultTheme, favicon } = useContent("settings");
  const { colorMode, setColorMode } = useColorMode();

  useEffect(() => {
    cacheDefaultTheme(defaultTheme);
    if (!hasChosenColorMode() && colorMode !== defaultTheme) setColorMode(defaultTheme);
  }, [defaultTheme, colorMode, setColorMode]);

  useEffect(() => {
    if (!favicon) return;
    document.head.querySelectorAll('link[rel="icon"]').forEach((link) => link.remove());
    const link = document.createElement("link");
    link.rel = "icon";
    link.href = favicon;
    document.head.appendChild(link);
  }, [favicon]);

  return null;
}
