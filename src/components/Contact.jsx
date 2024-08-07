import { contactLinks } from "../assets/contact-links";
import "../style.css";
import { Link, Box } from "@chakra-ui/react";
function Contact() {
	return (
		<section
			id="contact"
			className="contact-form">
			<Box
				w="fit-content"
				p={4}
				borderWidth="1px"
				borderRadius="lg"
				overflow="hidden"
				className="top-links">
				{contactLinks.map((contactLink) => {
					return (
						<Link
							key={contactLink.href}
							href={contactLink.href}
							target="_blank"
							rel="noreferrer">
							<abbr title={contactLink.title}>
								<contactLink.icon style={{ fontSize: "25px", color: contactLink.color }} />
							</abbr>
						</Link>
					);
				})}
			</Box>
		</section>
	);
}

export default Contact;
