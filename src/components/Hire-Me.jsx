/** @format */
import "../style.css";
export default function HireMe() {
	return (
		<div className="hireAndDownload">
			<div>
				<pre style={{ fontSize: "1rem" }}>Interested to work with me ? </pre>
			</div>
			<div id="hire-me">
				<a
					href="https://www.upwork.com/freelancers/~018c214d3139f0f30e"
					target="_blank"
					rel="noreferrer">
					Hire Me on Upwork
				</a>
			</div>
			<p style={{ marginRight: "1rem" }}>OR</p>
			<div>
				<li id="download-cv">
					<a
						href="/Majid-Ali-Resume-Updated.pdf"
						download={true}>
						Download Resume
					</a>
				</li>
			</div>
		</div>
	);
}
