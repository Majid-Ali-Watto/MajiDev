import {
  FaLinkedin,
  FaMedium,
  FaGithub,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa6";
import { TbFileCv, TbBrandUpwork } from "react-icons/tb";
import {
  devArticles,
  devEmail,
  devGithub,
  devPhone,
  devPortfolio,
  hireMeLink,
} from "./generic-data";
import printResume from "../utils/printResume";

export const contactLinks = [
  {
    href: devPortfolio,
    title: "LinkedIn",
    color: "blue",
    icon: FaLinkedin,
  },
  {
    href: devGithub,
    title: "Github",
    // color: "black",
    icon: FaGithub,
  },

  {
    href: "mailto:" + devEmail,
    title: "Email",
    color: "red",
    icon: FaEnvelope,
  },
  {
    href: "https://wa.me/" + devPhone,
    title: "Whatsapp",
    color: "green",
    icon: FaWhatsapp,
  },
  {
    href: devArticles,
    title: "Medium",
    // color: "black",
    icon: FaMedium,
  },
  {
    href: hireMeLink,
    title: "Upwork",
    // color: "black",
    icon: TbBrandUpwork,
  },
  {
    title: "Resume",
    // color: "black",
    icon: TbFileCv,
    onClick: printResume,
  },
];
