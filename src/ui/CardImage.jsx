import { Box, IconButton, Image, Skeleton } from "@chakra-ui/react";
import { FaExpand } from "react-icons/fa";
import PropTypes from "prop-types";
import useImageSrc from "../hooks/useImageSrc";

// The picture across the top of a card. `src` is a /public path, a URL or an uploaded image ("upload:{id}").
function CardImage({ src, alt }) {
	const address = useImageSrc(src);
	if (address === undefined) return <Skeleton height="13rem" />;
	if (!address) return null; // an uploaded image that couldn't be loaded: the card goes without
	return (
		<Box position="relative" overflow="hidden" height="13rem">
			<Image
				src={address}
				alt={alt}
				loading="lazy"
				decoding="async"
				referrerPolicy="no-referrer"
				height="100%"
				width="100%"
				objectFit="cover"
				transition="transform 0.5s ease"
				_groupHover={{ transform: "scale(1.06)" }}
			/>
			<Box aria-hidden position="absolute" inset={0} bgGradient="linear(to-t, blackAlpha.500, transparent 50%)" pointerEvents="none" />
			<IconButton
				aria-label="View full image"
				icon={<FaExpand />}
				position="absolute"
				bottom="8px"
				right="8px"
				opacity={0}
				_groupHover={{ opacity: 1 }}
				_focusVisible={{ opacity: 1 }}
				transition="opacity 0.3s"
				bg="rgba(0, 0, 0, 0.7)"
				color="white"
				_hover={{ bg: "rgba(0, 0, 0, 0.9)" }}
				borderRadius="full"
				size="sm"
				onClick={() => window.open(address, "_blank", "noopener,noreferrer")}
			/>
		</Box>
	);
}

CardImage.propTypes = { src: PropTypes.string.isRequired, alt: PropTypes.string };

export default CardImage;
