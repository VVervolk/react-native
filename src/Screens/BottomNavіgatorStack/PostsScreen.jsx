import { ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import UserPosts from "../../components/UserPosts";
// import { useSelector } from "react-redux";
// import { selectUser } from "../../redux/selectors";

const users = [
  {
    id: 1,
    data: {
      photo: null,
      name: "Natali Romanova",
      email: "email@example.com",
    },
    posts: [
      {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "First Item",
      },
      {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        title: "Second Item",
      },
    ],
  },

  {
    id: 2,

    data: {
      photo: null,
      name: "Naruto Uzumaki",
      email: "email@example.com",
    },
    posts: [
      {
        id: "bd7acb1ea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "First Item",
      },
      {
        id: "3ac62afc-c605-48d3-a4f8-fbd91aa97f63",
        title: "Second Item",
      },
    ],
  },
];

export default function PostsScreen() {
  // const userData = useSelector(selectUser);
  // console.log(userData);
  return (
    <>
      <ScrollView style={styles.container}>
        {users.length !== 1 &&
          users.map((user) => <UserPosts key={user.id} user={user} />)}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
    backgroundColor: "white",
    paddingBottom: 34,
  },
});
