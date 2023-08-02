import { Text } from "react-native";
import { Image, StyleSheet, View } from "react-native";
import { Feather, SimpleLineIcons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Post({ data, ownerEmail }) {
  const navigation = useNavigation();
  const { comments, location, photo, place, title, id } = data;

  console.log(data);

  return (
    <View style={styles.box}>
      <Image style={styles.image} source={{ uri: photo }} />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.buttonsBox}>
        <Pressable
          style={styles.button}
          onPress={() =>
            navigation.navigate("Comments", { ownerEmail, photo, comments, id })
          }
        >
          <Feather name="message-circle" size={24} color="#FF6C00" />
          <Text>{comments.length}</Text>
        </Pressable>
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
