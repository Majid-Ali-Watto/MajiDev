import useContent from "../hooks/useContent";
import CardsList from "../ui/CardsList";


function Packages() {
	const packages = useContent("packages");
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
