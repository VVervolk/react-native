import { Pressable, StyleSheet, Text } from "react-native";

export default function ShowPassword({ children, onPress }) {
  return (
    <Pressable style={styles.passwordButton} onPress={onPress}>
      <Text style={styles.passwordButtonText}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  passwordButton: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  passwordButtonText: {
    color: "#1B4371",
    fontSize: 16,
    lineHeight: 18.75,
  },
});
