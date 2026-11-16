
import useContent from "../hooks/useContent";
import CardsList from "../ui/CardsList";

function Blogs() {
	const blogs = useContent("blogs");
	return (
		<CardsList
			id="blogs"
			heading="Blogs"
			list={blogs}
			buttons={["Read full Blog"]}
		/>
	);
}

export default Blogs;
