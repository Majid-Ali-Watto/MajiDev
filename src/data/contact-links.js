import { devArticles, devEmail, devGithub, devPhone, devPortfolio, hireMeLink } from "./generic-data";
import { companyData } from "./company-data";

// Serializable so it can be stored in Firestore as-is. Icon names resolve through ./contactIcons.
// action: "link" opens `href`; "printResume" prints the on-page résumé (href is ignored).
export const contactLinks = [
  { title: "LinkedIn", action: "link", href: devPortfolio, icon: "FaLinkedin", color: "blue", visible: true },
  { title: "Github", action: "link", href: devGithub, icon: "FaGithub", color: "", visible: true },
  { title: "Email", action: "link", href: "mailto:" + devEmail, icon: "FaEnvelope", color: "red", visible: true },
  { title: "Whatsapp", action: "link", href: "https://wa.me/" + devPhone, icon: "FaWhatsapp", color: "green", visible: true },
  { title: "Medium", action: "link", href: devArticles, icon: "FaMedium", color: "", visible: true },
  { title: "Upwork", action: "link", href: hireMeLink, icon: "TbBrandUpwork", color: "", visible: true },
  { title: "Resume", action: "printResume", href: "", icon: "TbFileCv", color: "", visible: true },
  { title: companyData.name, action: "link", href: companyData.link, icon: "FaBuilding", color: "", visible: true },
];
