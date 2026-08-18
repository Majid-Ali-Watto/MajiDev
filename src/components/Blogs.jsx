
import { blogs } from "../data/blogs";
import CardsList from "../ui/CardsList";

function Blogs() {
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
