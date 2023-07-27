import { Image } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import User from "../images/user.jpg";
import { Text } from "react-native";
import Post from "./Post";

export default function UserPosts({ user }) {
  const { data, posts } = user;
  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <Image style={styles.image} source={User} />
        <View style={styles.userData}>
          <Text style={styles.name}>{data.name && data.name}</Text>
          <Text style={styles.email}>{data.email && data.email}</Text>
        </View>
      </View>
      <View style={styles.postsContainer}>
        {posts.map((item) => (
          <Post key={item.id}></Post>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  user: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    marginBottom: 32,
  },
  userData: {
    justifyContent: "center",
  },
  name: {
    fontSize: 13,
    fontWeight: 700,
  },
  email: {
    color: "rgba(33, 33, 33, 0.8)",
  },
  postsContainer: {
    gap: 32,
  },
});
