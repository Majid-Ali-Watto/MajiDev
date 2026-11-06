import PropTypes from "prop-types";
import { HStack, PinInput, PinInputField } from "@chakra-ui/react";

// The 6-digit code from the authenticator app (sign-in and setup). `otp` lets the browser and password managers fill it;
// onComplete fires once all six digits are in, so pasting or typing the last digit submits.
export default function CodeInput({ value, onChange, onComplete, isDisabled }) {
  return (
    <HStack justify="center" spacing={{ base: 1.5, sm: 2 }}>
      <PinInput otp type="number" size="lg" autoFocus focusBorderColor="teal.400" value={value} onChange={onChange} onComplete={onComplete} isDisabled={isDisabled}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <PinInputField key={i} aria-label={`Digit ${i + 1} of 6`} />
        ))}
      </PinInput>
    </HStack>
  );
}

CodeInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
};
