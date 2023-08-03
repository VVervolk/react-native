import { ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import UserPosts from "../../components/UserPosts";
import { useDispatch, useSelector } from "react-redux";
import { selectPosts, selectUser } from "../../redux/selectors";
import { useEffect, useState } from "react";
import { getPosts } from "../../redux/operations";

export default function PostsScreen() {
  const postsAll = useSelector(selectPosts);
  const dispatch = useDispatch();
  const [array, setArray] = useState([]);

  useEffect(() => {
    dispatch(getPosts());
    const sortedArray = [...postsAll];
    sortedArray
      .sort((first, second) => first.email.localeCompare(second.email))
      .reduce((previousName, post, idx) => {
        if (idx === 1) {
          const firstUser = postsAll.filter((item) => {
            return item.email === previousName.email;
          });
          setArray((state) => [
            ...state,
            {
              userEmail: previousName.email,
              userName: previousName.name,
              posts: firstUser,
            },
          ]);
          return previousName.email;
        }

        if (previousName !== post.email) {
          const anotherUser = postsAll.filter((item) => {
            return item.email === post.email;
          });
          setArray((state) => [
            ...state,
            {
              userEmail: post.email,
              userName: post.name,
              posts: anotherUser,
            },
          ]);
        }

        return post.email;
      });
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      {array.length !== 0 &&
        array.map(({ posts, userEmail, userName }) => (
          <UserPosts
            key={Math.random() * 100}
            posts={posts}
            email={userEmail}
            name={userName}
          />
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
