import { Image } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import User from "../images/user.jpg";
import { Text } from "react-native";

export default function UserPosts({ user }) {
  const { data, posts } = user;
  return (
    <View>
      <View>
        <Image style={styles.image} source={User} />
        <View style={styles.userData}>
          <Text></Text>
          <Text></Text>
        </View>
      </View>
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  image: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  userData: {},
});
