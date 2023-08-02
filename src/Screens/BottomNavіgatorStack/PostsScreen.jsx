import { ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import UserPosts from "../../components/UserPosts";
import { useDispatch, useSelector } from "react-redux";
import { selectPosts, selectUser } from "../../redux/selectors";
import { useEffect } from "react";
import { getUserPosts } from "../../redux/operations";

export default function PostsScreen() {
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserPosts());
  }, []);
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      {posts.map(({ posts, user }) => (
        <UserPosts posts={posts} user={user} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
    backgroundColor: "white",
  },
});
