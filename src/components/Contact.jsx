import { contactLinks } from "../assets/contact-links";
import "../style.css";

function Contact() {
	return (
		<section
			id="contact"
			className="contact-form">
			<div className="top-links">
				{contactLinks.map((contactLink) => {
					return (
						<a
							key={contactLink.href}
							href={contactLink.href}
							target="_blank"
							rel="noreferrer">
							<abbr title={contactLink.title}>
								<contactLink.icon style={{ fontSize: "25px", color: contactLink.color }} />
							</abbr>
						</a>
					);
				})}
			</div>
		</section>
	);
}

export default Contact;
