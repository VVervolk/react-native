import { Image } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import User from "../images/user.jpg";
import { Text } from "react-native";
import Post from "./Post";

export default function UserPosts({ user, posts }) {
  const { email, name } = user;
  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <Image style={styles.image} source={User} />
        <View style={styles.userData}>
          <Text style={styles.name}>{name && name}</Text>
          <Text style={styles.email}>{email && email}</Text>
        </View>
      </View>
      <View style={styles.postsContainer}>
        {posts.length !== 0 ? (
          posts.map((item) => <Post data={item} key={item.id}></Post>)
        ) : (
          <Text style={styles.noPosts}>No posts yet</Text>
        )}
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
  noPosts: {
    fontSize: 18,
    fontWeight: 700,
  },
});
