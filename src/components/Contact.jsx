/** @format */

import "../style.css";

import { FaSquareFacebook, FaInstagram, FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa6";

function Contact() {
	return (
		<section id="contact" className="contact-form">
			<h2>Contact Me</h2>
			<div className="links">
				<a href="https://www.linkedin.com/in/majid-ali-074b97245/" target="_blank" rel="noreferrer">
					<FaLinkedin style={{ fontSize: "25px", color: "black", marginRight: "10px" }} />
					<legend>https://www.linkedin.com/in/majid-ali-074b97245/</legend>
				</a>

				<a href="https://github.com/Majid-Ali-Watto" target="_blank" rel="noreferrer">
					<FaGithub style={{ fontSize: "25px", color: "black", marginRight: "10px" }} />
					<legend>https://github.com/Majid-Ali-Watto</legend>
				</a>
				<a href="https://www.facebook.com/groups/246606200063950/?ref=share_group_link" target="_blank" rel="noreferrer">
					<FaSquareFacebook style={{ fontSize: "25px", color: "black", marginRight: "10px" }} />
					<legend>https://www.facebook.com/groups/246606200063950/?ref=share_group_link</legend>
				</a>
				<a href="https://instagram.com/majid_ali_wattu?utm_source=qr&igshid=ZDc4ODBmNjlmNQ%3D%3D" target="_blank" rel="noreferrer">
					<FaInstagram style={{ fontSize: "25px", color: "black", marginRight: "10px" }} />
					<legend>https://instagram.com/majid_ali_wattu?utm_source=qr&igshid=ZDc4ODBmNjlmNQ%3D%3D</legend>
				</a>
				<a href="mailto:majidaliqau@gmail.com" target="_blank" rel="noreferrer">
					<FaEnvelope style={{ fontSize: "25px", color: "black", marginRight: "10px" }} />
					<legend>majidaliqau@gmail.com</legend>
				</a>
			</div>
		</section>
	);
}

export default Contact;
