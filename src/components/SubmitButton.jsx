import { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

export default function SubmitButton({ children, onPress, isLogIn }) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Pressable
      disabled={isLogIn}
      style={({ pressed }) => [
        styles.submitButton,
        (isLogIn || pressed) && styles.submitButtonPressed,
      ]}
      onPressIn={() => {
        setIsPressed(true);
      }}
      onPressOut={() => {
        setIsPressed(false);
      }}
      onPress={onPress}
    >
      <Text
        style={[
          styles.submitButtonText,
          (isLogIn || isPressed) && styles.submitButtonTextPressed,
        ]}
      >
        {isLogIn ? "Входимо..." : children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  submitButton: {
    height: 51,
    borderRadius: 100,
    justifyContent: "center",
    marginBottom: 16,
    borderWidth: 2,
    backgroundColor: "#FF6C00",
    borderColor: "white",
  },
  submitButtonPressed: {
    backgroundColor: "white",
    borderColor: "#FF6C00",
  },
  submitButtonText: {
    fontSize: 16,
    textAlign: "center",
    color: "white",
  },
  submitButtonTextPressed: {
    color: "#FF6C00",
  },
});
