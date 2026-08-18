import { devFullName, devPost } from "../data/generic-data";

export default function printResume() {
  const resumeEl = document.querySelector(".print-resume");
  if (!resumeEl) return;

  // Clone content and convert any SVG icons to text equivalents for print compatibility
  const clone = resumeEl.cloneNode(true);
  clone.querySelectorAll("svg").forEach((svg) => {
    const text = document.createTextNode("");
    svg.replaceWith(text);
  });

  const content = clone.innerHTML;

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
  <title>${devFullName}--${devPost}</title>
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
