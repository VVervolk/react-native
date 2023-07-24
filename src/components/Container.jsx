import { StyleSheet, View } from "react-native";

export default function Container({ children }) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: 350,
    width: "100%",
  },
});
