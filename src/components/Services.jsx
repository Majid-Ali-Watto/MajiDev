/** @format */

import useContent from "../hooks/useContent";
import CardsList from "../ui/CardsList";


function Services() {
	const services = useContent("services");
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
