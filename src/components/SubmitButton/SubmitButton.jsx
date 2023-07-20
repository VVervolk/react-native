import { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

export default function SubmitButton({ children, onPress }) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.submitButton,
        pressed && styles.submitButtonPressed,
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
          isPressed && styles.submitButtonTextPressed,
        ]}
      >
        {children}
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
    fontFamily: "Roboto",
    color: "white",
  },
  submitButtonTextPressed: {
    color: "#FF6C00",
  },
});
