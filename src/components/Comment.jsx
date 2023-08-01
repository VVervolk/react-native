import { Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import User from "../images/user.jpg";
import { Image } from "react-native";

export default function Comment({ comment, userEmail }) {
  const { text, time, email } = comment;
  const owner = userEmail === email;

  const date = new Date(time).toDateString();

  return (
    <View
      style={[
        styles.box,
        {
          flexDirection: owner ? "row-reverse" : "row",
        },
      ]}
    >
      {owner ? (
        <Image style={styles.icon} source={User} />
      ) : (
        <View
          style={[
            styles.icon,
            {
              backgroundColor: "#FF6C00",
            },
          ]}
        >
          <AntDesign name="user" size={20} color="#FFFFFF" />
        </View>
      )}

      <View style={styles.comment}>
        <Text>{text}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  box: { gap: 16, paddingRight: 50 },
  icon: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 13,
  },
  comment: {
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    padding: 16,
    gap: 8,
  },
  text: {
    color: "#212121",
    fontSize: 13,
    lineHeight: 18,
  },
  date: {
    fontSize: 10,
    color: "#BDBDBD",
    alignSelf: "flex-end",
  },
});
