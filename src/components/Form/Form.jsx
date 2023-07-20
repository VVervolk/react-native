import { StyleSheet, View } from "react-native";

export default function Form({ children }) {
  return <View style={styles.form}>{children}</View>;
}

const styles = StyleSheet.create({
  form: {
    gap: 16,
    paddingBottom: 43,
  },
});
