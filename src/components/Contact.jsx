import "../style.css";

import { FaSquareFacebook, FaInstagram, FaLinkedin, FaMedium, FaGithub, FaEnvelope, FaWhatsapp } from "react-icons/fa6";

function Contact() {
	return (
		<section
			id="contact"
			className="contact-form">
			{/* <h2>Contact Me</h2> */}
			<div className="top-links">
				<a
					href="https://www.linkedin.com/in/majid-ali-074b97245/"
					target="_blank"
					rel="noreferrer">
					<abbr title="LinkedIn">
						<FaLinkedin style={{ fontSize: "25px", color: "blue" }} />
					</abbr>
				</a>
				<a
					href="https://github.com/Majid-Ali-Watto"
					target="_blank"
					rel="noreferrer">
					<abbr title="Github">
						<FaGithub style={{ fontSize: "25px", color: "black" }} />
					</abbr>
				</a>
				<a
					href="https://www.facebook.com/groups/246606200063950/?ref=share_group_link"
					target="_blank"
					rel="noreferrer">
					<abbr title="Facebook">
						<FaSquareFacebook style={{ fontSize: "25px", color: "blue" }} />
					</abbr>
				</a>
				<a
					href="https://instagram.com/majid_ali_wattu?utm_source=qr&igshid=ZDc4ODBmNjlmNQ%3D%3D"
					target="_blank"
					rel="noreferrer">
					<abbr title="Instagram">
						<FaInstagram style={{ fontSize: "25px", color: "black" }} />
					</abbr>
				</a>
				<a
					href="mailto:majidaliqau@gmail.com"
					target="_blank"
					rel="noreferrer">
					<abbr title="Email">
						<FaEnvelope style={{ fontSize: "25px", color: "red" }} />
					</abbr>
				</a>
				<a
					href="https://wa.me/923275065850"
					target="_blank"
					rel="noreferrer">
					<abbr title="Whatsapp">
						<FaWhatsapp style={{ fontSize: "25px", color: "green" }} />
					</abbr>
				</a>

				<a
					href="https://medium.com/@majid.teresol"
					target="_blank"
					rel="noreferrer">
					<abbr title="Medium">
						<FaMedium style={{ fontSize: "25px", color: "black" }} />
					</abbr>
				</a>
			</div>
			{/* <div className="links">
				<a
					href="https://www.linkedin.com/in/majid-ali-074b97245/"
					target="_blank"
					rel="noreferrer">
					<FaLinkedin style={{ fontSize: "25px", color: "black", marginRight: "10px" }} />
					<span className="path">https://www.linkedin.com/in/majid-ali-074b97245/</span>
				</a>

				<a
					href="https://github.com/Majid-Ali-Watto"
					target="_blank"
					rel="noreferrer">
					<FaGithub style={{ fontSize: "25px", color: "black", marginRight: "10px" }} />
					<span className="path">https://github.com/Majid-Ali-Watto</span>
				</a>
				<a
					href="https://www.facebook.com/groups/246606200063950/?ref=share_group_link"
					target="_blank"
					rel="noreferrer">
					<FaSquareFacebook style={{ fontSize: "25px", color: "black", marginRight: "10px" }} />
					<span className="path">https://www.facebook.com/groups/246606200063950/?ref=share_group_link</span>
				</a>
				<a
					href="https://instagram.com/majid_ali_wattu?utm_source=qr&igshid=ZDc4ODBmNjlmNQ%3D%3D"
					target="_blank"
					rel="noreferrer">
					<FaInstagram style={{ fontSize: "25px", color: "black", marginRight: "10px" }} />
					<span className="path">https://instagram.com/majid_ali_wattu?utm_source=qr&igshid=ZDc4ODBmNjlmNQ%3D%3D</span>
				</a>
				<a
					href="mailto:majidaliqau@gmail.com"
					target="_blank"
					rel="noreferrer">
					<FaEnvelope style={{ fontSize: "25px", color: "black", marginRight: "10px" }} />
					<span className="path">majidaliqau@gmail.com</span>
				</a>
				<a
					href="https://wa.me/923275065850"
					target="_blank"
					rel="noreferrer">
					<FaWhatsapp style={{ fontSize: "25px", color: "black", marginRight: "10px" }} />
					<span className="path">+923275065850</span>
				</a>
				<a
					href="https://medium.com/@majid.teresol"
					target="_blank"
					rel="noreferrer">
					<FaMedium style={{ fontSize: "25px", color: "black", marginRight: "10px" }} />
					<span className="path">https://medium.com/@majid.teresol</span>
				</a>
			</div> */}
		</section>
	);
}

export default Contact;
