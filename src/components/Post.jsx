import { Text } from "react-native";
import { Image, StyleSheet, View } from "react-native";
import { Feather, AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import Example from "../images/example.jpg";

export default function Post() {
  return (
    <View style={styles.box}>
      <Image style={styles.image} source={Example} />
      <Text style={styles.title}>Ліс</Text>
      <View style={styles.buttonsBox}>
        <View style={styles.activityBox}>
          <Pressable style={styles.button}>
            <Feather name="message-circle" size={24} color="#FF6C00" />
            <Text>8</Text>
          </Pressable>
          <Pressable style={styles.button}>
            <AntDesign name="like2" size={24} color="#FF6C00" />
            <Text>153</Text>
          </Pressable>
        </View>
        <View style={styles.locationBox}>
          <SimpleLineIcons name="location-pin" size={24} color="#BDBDBD" />
          <Text style={styles.locationText}>Ukraine</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    width: "100%",
    height: 300,
  },
  image: {
    width: "100%",
    height: 240,
    objectFit: "cover",
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 500,
    color: "#212121",
  },
  button: {
    display: "flex",
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  activityBox: {
    display: "flex",
    flexDirection: "row",
    gap: 24,
    alignItems: "center",
  },
  buttonsBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  locationBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  locationText: {
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
