
import "../style.css";
import { blogs } from "../assets/blogs";
import CardsList from "../generic-components/Cards-List";

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
