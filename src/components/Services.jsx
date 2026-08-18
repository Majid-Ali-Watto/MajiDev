/** @format */

import { services } from "../data/services";
import CardsList from "../ui/CardsList";


function Services() {
	return (
		<CardsList
			id="services"
			heading="Services"
			list={services}
			buttons={['Hire Me']}
		/>
	);
}

export default Services;
