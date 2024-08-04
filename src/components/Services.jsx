/** @format */
import { services } from "../assets/services";
import "../style.css";
function Services() {
	return (
		<section
			id="services"
			className="services">
			<h2 className="section-title">Services</h2>
			<div className="services-container">
				{services.map((ser, index) => {
					return (
						<div
							className="service-item"
							key={index}>
							<h3 className="service-title">{ser.title}</h3>
							<p className="service-description">{ser.description}</p>
						</div>
					);
				})}
			</div>
		</section>
	);
}

export default Services;
