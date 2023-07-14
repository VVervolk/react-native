import { ImageBackground, StyleSheet, Text, View } from "react-native";
import Background from "../images/background.jpg";

export default function RegistrationScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={Background}
        resizeMode="cover"
        imageStyle={styles.image}
      >
        <View style={styles.substrate}></View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 400,
    height: 100,
  },
  substrate: {
    backgroundColor: "#fff",
    height: 100,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
});
