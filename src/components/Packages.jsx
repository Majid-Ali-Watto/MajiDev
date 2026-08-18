import { packages } from "../data/packages";
import CardsList from "../ui/CardsList";


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
