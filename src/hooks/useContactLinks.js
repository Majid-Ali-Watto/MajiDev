import useContent from "./useContent";
import useResumePicker from "./useResumePicker";
import { contactIcons, FallbackContactIcon } from "../data/contactIcons";

// Readable destination for a contact link: the address, number, or site it opens
function describe(href) {
  if (href.startsWith("mailto:")) return href.slice("mailto:".length);
  if (href.startsWith("tel:")) return href.slice("tel:".length);
  try {
    const url = new URL(href);
    if (url.hostname === "wa.me") return `+${url.pathname.slice(1)}`;
    return `${url.hostname.replace(/^www\./, "")}${url.pathname.replace(/\/$/, "")}`;
  } catch {
    return href;
  }
}

// Contacts from content (hidden ones are already left out), resolved to an icon and the props that make a Chakra element
// open them. Links without a URL are dropped.
export default function useContactLinks() {
  const openResumePicker = useResumePicker();
  return useContent("contacts")
    .filter(({ action, href }) => action === "printResume" || href)
    .map(({ title, href, action, color, icon }) => {
      const isResume = action === "printResume";
      return {
        title,
        href,
        color: color || undefined,
        Icon: contactIcons[icon] ?? FallbackContactIcon,
        detail: isResume ? "Choose a version to download" : describe(href),
        linkProps: isResume
          ? { as: "button", type: "button", onClick: openResumePicker }
          : { as: "a", href, target: "_blank", rel: "noreferrer" },
      };
    });
}
