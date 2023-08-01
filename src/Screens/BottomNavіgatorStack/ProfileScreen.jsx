import { Pressable, ScrollView, View } from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import Background from "../../components/Background";
import Title from "../../components/Title";
import { useNavigation } from "@react-navigation/native";
import Container from "../../components/Container";
import { styles } from "../RegistrationScreen";
import { StyleSheet } from "react-native";
import Post from "../../components/Post";
import { useDispatch, useSelector } from "react-redux";
import { selectPosts, selectUser } from "../../redux/selectors";
import UserPosts from "../../components/UserPosts";
import { useEffect } from "react";
import { getUserPosts } from "../../redux/operations";
import { Text } from "react-native";

export default function RegistrationScreen() {
  const navigation = useNavigation();
  const user = useSelector(selectUser);
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserPosts(user.email));
  }, []);

  const onLogOut = () => {
    navigation.navigate("Login");
  };

  return (
    <Container>
      <Background>
        <ScrollView
          contentContainerStyle={{
            flex: posts.length > 1 ? 0 : 1,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={[
              styles.substrateRegister,
              {
                marginTop: 150,
                flex: 1,
              },
            ]}
          >
            <View style={styles.avatar}>
              <Pressable style={styles.addAvatarButton}>
                <Feather name="x-circle" size={25} color="#BDBDBD" />
              </Pressable>
            </View>
            <Pressable
              onPress={() => onLogOut()}
              style={stylesProfile.logOutButton}
            >
              <MaterialIcons name="logout" size={25} color="#BDBDBD" />
            </Pressable>

            <Title>{user.name}</Title>
            <View style={stylesProfile.postBox}>
              {posts.length !== 0 ? (
                posts.map((item) => <Post data={item} key={item.id}></Post>)
              ) : (
                <Text style={stylesProfile.noPosts}>No posts yet</Text>
              )}
            </View>
          </View>
        </ScrollView>
      </Background>
    </Container>
  );
}

export const stylesProfile = StyleSheet.create({
  logOutButton: {
    position: "absolute",
    top: 22,
    right: 16,
  },
  postBox: {
    width: "100%",
    gap: 32,
  },
  noPosts: {
    fontSize: 18,
    fontWeight: 700,
  },
});
