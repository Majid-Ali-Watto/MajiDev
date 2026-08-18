/** @format */
import PropTypes from "prop-types";
import { experienceData } from "../data/experienceData";
import { educationData } from "../data/educationData";
import { skills, skillsObj } from "../data/skills";
import { projects } from "../data/project-links";
import {
  devFullName,
  devEmail,
  devPhone,
  devLocation,
  devPortfolio,
  devGithub,
  devPost,
} from "../data/generic-data";
import { getTotalExperince, getExperienceYear } from "../utils/getExpYears";
import toLocalDate from "../utils/toLocaleDateString";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaExternalLinkAlt,
} from "react-icons/fa";

const INK   = "#111111";
const GREEN = "#15803d";
const MUTED = "#555555";
const RULE  = "#cccccc";
const font  = "'Segoe UI', Arial, sans-serif";

const c = {
  wrap: {
    fontFamily: font,
    fontSize: "10px",
    color: INK,
    lineHeight: "1.5",
    padding: "22px 28px",
    backgroundColor: "#fff",
    width: "100%",
  },

  // ── Header ──────────────────────────────
  header: {
    borderBottom: `2px solid ${GREEN}`,
    paddingBottom: "10px",
    marginBottom: "10px",
  },
  name: {
    fontSize: "22px",
    fontWeight: "800",
    color: INK,
    margin: "0 0 2px 0",
    letterSpacing: "-0.2px",
  },
  titleLine: {
    fontSize: "12px",
    color: GREEN,
    fontWeight: "700",
    margin: "0 0 7px 0",
  },
  contactRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "2px 18px",
    fontSize: "9.5px",
    color: INK,
    alignItems: "center",
  },
  contactItem: {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    color: INK,
    borderRight: `1px solid ${RULE}`,
    paddingRight: "14px",
  },
  contactItemLast: {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    color: INK,
  },

  // ── Section heading ──────────────────────
  h: {
    fontSize: "9.5px",
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: "1.2px",
    color: GREEN,
    borderBottom: `1px solid ${RULE}`,
    paddingBottom: "2px",
    marginTop: "12px",
    marginBottom: "6px",
  },

  // ── Skills ───────────────────────────────
  skillRow: {
    display: "flex",
    gap: "4px",
    alignItems: "flex-start",
    marginBottom: "3px",
  },
  skillLabel: {
    fontWeight: "700",
    fontSize: "9.5px",
    color: INK,
    minWidth: "100px",
    flexShrink: 0,
  },
  skillValue: {
    fontSize: "9.5px",
    color: INK,
    lineHeight: "1.5",
  },

  // ── Experience ────────────────────────────
  expItem: { marginBottom: "10px", pageBreakInside: "avoid" },
  expHeaderRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    flexWrap: "wrap",
    gap: "2px",
    marginBottom: "2px",
  },
  jobTitle:  { fontWeight: "700", fontSize: "11px", color: INK },
  company:   { fontWeight: "700", fontSize: "11px", color: GREEN },
  dateRange: { fontSize: "9px", color: MUTED, fontStyle: "italic", whiteSpace: "nowrap" },
  projName:  { fontWeight: "700", fontSize: "10px", color: INK, margin: "4px 0 1px" },
  projAbout: { fontSize: "9.5px", color: MUTED, fontStyle: "italic", margin: "0 0 2px" },
  ul: { margin: "2px 0 0", paddingLeft: "14px" },
  li: { margin: "1.5px 0", lineHeight: "1.4", fontSize: "9.5px", color: INK },

  // ── Projects ─────────────────────────────
  projItem:  { marginBottom: "8px", pageBreakInside: "avoid" },
  projTitle: { fontWeight: "700", fontSize: "10.5px", color: INK, margin: "0 0 1px" },
  projStack: { fontSize: "9px", color: MUTED, margin: "0 0 1px" },
  projDesc:  { fontSize: "9.5px", color: INK, lineHeight: "1.4", margin: "0 0 2px" },
  projTitleRow: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "6px 10px",
    marginBottom: "1px",
  },
  projLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: "3px",
    color: GREEN,
    fontWeight: "600",
    fontSize: "9px",
    textDecoration: "underline",
    textDecorationColor: GREEN,
    cursor: "pointer",
  },

  // ── Education ────────────────────────────
  eduItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: "2px",
    marginBottom: "6px",
  },
  eduDegree: { fontWeight: "700", fontSize: "10.5px", color: INK, margin: 0 },
  eduInst:   { fontSize: "9.5px", color: MUTED, margin: "1px 0 0" },
  eduDur:    { fontSize: "9px", color: MUTED, fontStyle: "italic", margin: 0, whiteSpace: "nowrap" },
};

const iconProps = { size: 10, color: GREEN, style: { flexShrink: 0 } };

PrintResume.propTypes = { about: PropTypes.string };

export default function PrintResume({ about }) {
  const totalExp = getTotalExperince();
  const summary =
    about?.replace("Y-M-D", `<b>(${totalExp})</b>`) ||
    `Full Stack Web Developer with <b>(${totalExp})</b> of experience specializing in <b>Vue, React, Node.js, and Express</b>. Proficient in building scalable <b>micro front-end architectures</b>, modernizing legacy systems, and delivering efficient, user-focused solutions. Skilled in optimizing performance and developing reusable components for seamless software delivery.`;

  return (
    <div className="print-resume" aria-hidden="true">
      <div style={c.wrap}>

        {/* ── HEADER ── */}
        <div style={c.header}>
          <p style={c.name}>{devFullName}</p>
          <p style={c.titleLine}>{devPost}</p>
          <div style={c.contactRow}>
            <span style={c.contactItem}><FaEnvelope {...iconProps} />{devEmail}</span>
            <span style={c.contactItem}><FaPhone {...iconProps} />+{devPhone}</span>
            <span style={c.contactItem}><FaMapMarkerAlt {...iconProps} />{devLocation}</span>
            <span style={c.contactItem}><FaLinkedin {...iconProps} /><a href={devPortfolio} target="_blank" rel="noreferrer" style={{ color: GREEN, textDecoration: "underline" }}>LinkedIn</a></span>
            <span style={c.contactItemLast}><FaGithub {...iconProps} /><a href={devGithub} target="_blank" rel="noreferrer" style={{ color: GREEN, textDecoration: "underline" }}>GitHub</a></span>
          </div>
        </div>

        {/* ── PROFESSIONAL SUMMARY ── */}
        <p style={{ ...c.h, marginTop: 0 }}>Professional Summary</p>
        <p style={{ margin: 0, fontSize: "9.5px", lineHeight: "1.6" }} dangerouslySetInnerHTML={{ __html: summary }} />

        {/* ── TECHNICAL SKILLS ── */}
        <p style={c.h}>Technical Skills</p>
        {skillsObj.map((cat) => (
          <div key={cat.type} style={c.skillRow}>
            <span style={c.skillLabel}>{cat.label}:</span>
            <span style={c.skillValue}>{skills[cat.type].map((s) => s.label).join(", ")}</span>
          </div>
        ))}

        {/* ── WORK EXPERIENCE ── */}
        <p style={c.h}>Work Experience</p>
        {experienceData.map((exp, i) => (
          <div key={i} style={c.expItem}>
            <div style={c.expHeaderRow}>
              <span>
                <span style={c.jobTitle}>{exp.role}</span>
                <span style={{ color: MUTED }}> — </span>
                <span style={c.company}>{exp.company}</span>
                {exp.location && <span style={{ color: MUTED, fontSize: "9.5px" }}>, {exp.location}</span>}
              </span>
              <span style={c.dateRange}>
                {toLocalDate(exp.startDate)} – {toLocalDate(exp.endDate)}&nbsp;
                <strong>({getExperienceYear(exp.startDate, exp.endDate)})</strong>
              </span>
            </div>
            {exp.projects.map((proj, j) => (
              <div key={j} style={{ paddingLeft: "6px" }}>
                {proj.name  && <p style={c.projName}>▸ {proj.name}</p>}
                {proj.about && <p style={c.projAbout} dangerouslySetInnerHTML={{ __html: proj.about }} />}
                <ul style={c.ul}>
                  {proj.description.map((d, k) => (
                    <li key={k} style={c.li} dangerouslySetInnerHTML={{ __html: d.description }}></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}

        {/* ── PROJECTS ── */}
        <p style={c.h}>Projects</p>
        {projects.filter((proj) => proj.includeInResume).map((proj, i) => (
          <div key={i} style={c.projItem}>
            <div style={c.projTitleRow}>
              <p style={{ ...c.projTitle, margin: 0 }}>{proj.title}</p>
              {proj.link && (
                <a href={proj.link} target="_blank" rel="noreferrer" style={c.projLink}>
                  <FaExternalLinkAlt size={7} style={{ flexShrink: 0 }} />
                  Preview
                </a>
              )}
              {proj.gLink && (
                <a href={proj.gLink} target="_blank" rel="noreferrer" style={c.projLink}>
                  <FaGithub size={8} style={{ flexShrink: 0 }} />
                  GitHub
                </a>
              )}
            </div>
            <p style={c.projStack}>Stack: {proj.stack.join(", ")}</p>
            <p style={c.projDesc} dangerouslySetInnerHTML={{ __html: proj.description }} />
          </div>
        ))}

        {/* ── EDUCATION ── */}
        <p style={c.h}>Education</p>
        {educationData.slice(0, 1).map((edu, i) => (
          <div key={i} style={c.eduItem}>
            <div>
              <p style={c.eduDegree}>{edu.degree}</p>
              <p style={c.eduInst}>{edu.institution}</p>
            </div>
            <p style={c.eduDur}>{edu.duration}</p>
          </div>
        ))}

      </div>
    </div>
  );
}
