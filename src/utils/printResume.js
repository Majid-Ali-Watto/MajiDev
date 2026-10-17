import { createElement } from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import { loadContent } from "../hooks/useContent";

// Sections components/PrintResume reads (settings first); fetched only when someone opens the résumé picker or prints
export const RESUME_SECTIONS = ["settings", "about", "experience", "education", "skills", "projects"];

// Renders the résumé version `resume` (an item of the Résumés section; {} = everything) off-page and prints it.
// Content comes from this visit's fetch, so it is the latest saved in /admin.
export default async function printResume(resume = {}) {
  const [{ default: PrintResume }, [settings]] = await Promise.all([import("../components/PrintResume"), loadContent(RESUME_SECTIONS)]);
  // Suggested PDF file name
  const title = `${settings.devName}--${resume.role || settings.roles[0]}`;
  const host = document.createElement("div");
  const root = createRoot(host);
  flushSync(() => root.render(createElement(PrintResume, { resume })));

  // Convert any SVG icons to text equivalents for print compatibility
  host.querySelectorAll("svg").forEach((svg) => {
    const text = document.createTextNode("");
    svg.replaceWith(text);
  });

  const content = host.querySelector(".print-resume").innerHTML;
  root.unmount();

  const styles = `
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #fff; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    @page { size: A4; margin: 10mm 0; }
    @page { @top-left { content: none; } @top-right { content: none; } @bottom-left { content: none; } @bottom-right { content: none; } }
    @media print { body { visibility: visible; } title { display: none; } }
  `;

  // Use hidden iframe approach — works reliably on both desktop and mobile
  let iframe = document.getElementById("print-resume-iframe");
  if (iframe) iframe.remove();

  iframe = document.createElement("iframe");
  iframe.id = "print-resume-iframe";
  iframe.style.cssText =
    "position:fixed;top:0;left:0;width:100%;height:100%;border:none;opacity:0;pointer-events:none;z-index:-1;";
  document.body.appendChild(iframe);

  const doc = iframe.contentDocument || iframe.contentWindow.document;
  doc.open();
  doc.write(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <style>${styles}</style>
</head>
<body>${content}</body>
</html>`);
  doc.close();

  // Wait for content to render before printing
  iframe.onload = () => {
    setTimeout(() => {
      try {
        iframe.contentWindow.print();
      } catch {
        // If iframe print fails, fallback to window print
        window.print();
      }
      // Clean up iframe after print dialog closes
      setTimeout(() => {
        iframe.remove();
      }, 1000);
    }, 300);
  };
}
