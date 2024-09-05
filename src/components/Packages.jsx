import { packages } from "../assets/packages";
import CardsList from "../generic-components/Cards-List";
import "../style.css";

function Packages() {
	return (
		<CardsList
			id="packages"
			heading="Npm Packages"
			list={packages}
			buttons={["Npm Registry", "Visit GitHub"]}
		/>
	);
}

export default Packages;
