// Chakra's own key, so visitors who already picked a theme keep it.
const CHOICE_KEY = "chakra-ui-color-mode";
// Last default fetched from Firestore, so the next visit paints in it immediately.
const DEFAULT_KEY = "site-default-theme";

const read = (key) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};
const write = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* storage unavailable (private mode); the theme just won't persist */
  }
};

export const getCachedDefaultTheme = () => (read(DEFAULT_KEY) === "light" ? "light" : "dark");
export const cacheDefaultTheme = (theme) => write(DEFAULT_KEY, theme);
export const hasChosenColorMode = () => read(CHOICE_KEY) !== null;
export const saveChosenColorMode = (mode) => write(CHOICE_KEY, mode);

// Chakra only persists what the toggle button saves via saveChosenColorMode, so an
// applied *default* is never mistaken for a visitor's choice (and follows later admin changes).
export const colorModeManager = {
  type: "localStorage",
  get: (fallback) => read(CHOICE_KEY) ?? fallback,
  set: () => {},
};
