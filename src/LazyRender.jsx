import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

function LazyRender({ children }) {
	const [isVisible, setIsVisible] = useState(false);
	const ref = useRef();

	useEffect(() => {
		const currentElement = ref.current; // Capture the current ref value

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
				}
			},
			{ threshold: 0.1 } // Trigger when 10% of the element is visible
		);

		if (currentElement) {
			observer.observe(currentElement);
		}

		return () => {
			if (currentElement) {
				observer.unobserve(currentElement);
			}
		};
	}, []);

	return <div ref={ref}>{isVisible && children}</div>;
}

LazyRender.propTypes = {
	children: PropTypes.node.isRequired
};

export default LazyRender;
