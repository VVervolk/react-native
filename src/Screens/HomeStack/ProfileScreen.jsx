import { Platform, Pressable, SafeAreaView, View } from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import Background from "../../components/Background";
import Title from "../../components/Title";
import { useNavigation } from "@react-navigation/native";
import Container from "../../components/Container";
import { styles } from "../RegistrationScreen";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native";
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
        <View style={styles.substrateRegister}>
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
          <View style={{ maxHeight: 200 }}>
            <Title>Natali Romanova</Title>
            <FlatList
              data={DATA}
              renderItem={({ item }) => <Post title={item.title} />}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
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
});
