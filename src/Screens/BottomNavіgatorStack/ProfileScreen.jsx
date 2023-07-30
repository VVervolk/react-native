import { Pressable, ScrollView, View } from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import Background from "../../components/Background";
import Title from "../../components/Title";
import { useNavigation } from "@react-navigation/native";
import Container from "../../components/Container";
import { styles } from "../RegistrationScreen";
import { StyleSheet } from "react-native";
import Post from "../../components/Post";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

export default function RegistrationScreen() {
  const navigation = useNavigation();

  const onLogOut = () => {
    navigation.navigate("Login");
  };

  return (
    <Container>
      <Background>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.substrateRegister, { marginTop: 100 }]}>
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

            <Title>Natali Romanova</Title>
            <View style={stylesProfile.postBox}>
              {DATA.length === 1
                ? "No posts yet"
                : DATA.map((item) => <Post key={item.id} />)}
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
});
