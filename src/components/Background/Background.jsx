import { ImageBackground, StyleSheet } from "react-native";
import BackgroundImage from "../../images/background.jpg";

export default function Background({ children }) {
  return (
    <ImageBackground
      source={BackgroundImage}
      resizeMode="cover"
      style={styles.image}
    >
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
