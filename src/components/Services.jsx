import { services } from "../assets/services";
import "../style.css";

function Services() {
	return (
		<section
			id="services"
			className="services"
			aria-labelledby="services-heading">
			<h2
				id="services-heading"
				className="section-title">
				Services
			</h2>
			<div className="services-container">
				{services.map((ser, index) => (
					<article
						className="service-item"
						key={index}
						aria-labelledby={`service-title-${index}`}
						aria-describedby={`service-description-${index}`}>
						<h3
							id={`service-title-${index}`}
							className="service-title">
							{ser.title}
						</h3>
						<p
							dangerouslySetInnerHTML={{ __html: ser.description }}
							id={`service-description-${index}`}
							className="service-description">
							{/* {ser.description} */}
						</p>
					</article>
				))}
			</div>
		</section>
	);
}

export default Services;
