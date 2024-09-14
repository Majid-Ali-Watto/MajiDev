/** @format */

import { services } from "../assets/services";
import CardsList from "../generic-components/Cards-List";


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
