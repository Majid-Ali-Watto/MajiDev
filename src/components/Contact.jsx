import { contactLinks } from "../assets/contact-links";
import { Link, Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

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
					// Use React.createElement for the icon component
					const IconComponent = contactLink.icon;

					return (
						<Link
							key={contactLink.href}
							href={contactLink.href}
							target="_blank"
							rel="noreferrer">
							<abbr title={contactLink.title}>
								<motion.div
									whileHover={{ scale: 1.2 }} // Scale effect on hover
									whileTap={{ scale: 0.9 }} // Tap effect
									transition={{ type: "spring", stiffness: 300, damping: 10 }}
									style={{ display: "inline-block" }}>
									<IconComponent style={{ fontSize: "25px", color: contactLink.color }} />
								</motion.div>
							</abbr>
						</Link>
					);
				})}
			</Box>
		</section>
	);
}

export default Contact;
