import { Text } from "react-native";
import { Image, StyleSheet, View } from "react-native";
import { Feather, AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import Example from "../images/example.jpg";
import { useNavigation } from "@react-navigation/native";

export default function Post({ data }) {
  const navigation = useNavigation();
  const { comments, likes, location, photo, place, title } = data;

  return (
    <View style={styles.box}>
      <Image style={styles.image} source={{ uri: photo }} />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.buttonsBox}>
        <View style={styles.activityBox}>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("Comments")}
          >
            <Feather name="message-circle" size={24} color="#FF6C00" />
            <Text>{comments.length}</Text>
          </Pressable>
          <Pressable style={styles.button}>
            <AntDesign name="like2" size={24} color="#FF6C00" />
            <Text>{likes}</Text>
          </Pressable>
        </View>
        <Pressable
          onPress={() => navigation.navigate("Map", { location })}
          style={styles.locationBox}
        >
          <SimpleLineIcons name="location-pin" size={24} color="#BDBDBD" />
          <Text style={styles.locationText}>{place}</Text>
        </Pressable>
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
    marginBottom: 8,
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
