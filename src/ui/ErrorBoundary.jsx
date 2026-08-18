import { Component } from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import PropTypes from "prop-types";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box textAlign="center" py={20} px={6}>
          <Heading as="h2" size="xl" mb={4}>
            Something went wrong
          </Heading>
          <Text fontSize="lg" mb={6}>
            An unexpected error occurred. Please try refreshing the page.
          </Text>
          <Button
            colorScheme="teal"
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
