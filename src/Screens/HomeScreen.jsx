import { createStackNavigator } from "@react-navigation/stack";
import PostsScreen from "./HomeStack/PostsScreen";
import CreatePostsScreen from "./HomeStack/CreatePostsScreen";
import CommentsScreen from "./HomeStack/CommentsScreen";
import ProfileScreen from "./HomeStack/ProfileScreen";
import MapScreen from "./HomeStack/MapScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { Platform } from "react-native";

const Tabs = createBottomTabNavigator();

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <Tabs.Navigator
      initialRouteName="Posts"
      backBehavior="none"
      screenOptions={({ route }) => ({
        headerLeft: () => {
          if (route.name === "CreatePosts") {
            return (
              <Pressable
                style={{ marginLeft: 16 }}
                onPress={() => navigation.navigate("Posts")}
                color="#fff"
              >
                <AntDesign
                  name="arrowleft"
                  size={24}
                  color={"rgba(33, 33, 33, 0.8)"}
                />
              </Pressable>
            );
          } else {
            return;
          }
        },
        headerRight: () => {
          if (route.name === "Posts") {
            return (
              <Pressable
                style={{ marginRight: 16 }}
                onPress={() => navigation.navigate("Login")}
              >
                <MaterialIcons name="logout" size={25} color="#BDBDBD" />
              </Pressable>
            );
          } else {
            return;
          }
        },
        tabBarStyle: {
          height: Platform.OS == "ios" ? 83 : 58,
          paddingTop: 9,
          paddingBottom: Platform.OS == "ios" ? 34 : 9,
        },
        tabBarIcon: () => {
          let iconName;
          switch (route.name) {
            case "Posts":
              iconName = "grid";
              break;

            case "CreatePosts":
              iconName = "plus";
              break;

            case "Profile":
              iconName = "user";
              break;

            default:
              break;
          }

          return route.name === "CreatePosts" ? (
            <TouchableOpacity
              onPress={() => navigation.navigate(route.name)}
              style={styles.iconTab}
            >
              <Feather name={iconName} size={24} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => navigation.navigate(route.name)}>
              <Feather name={iconName} size={24} color="#212121" />
            </TouchableOpacity>
          );
        },

        tabBarShowLabel: false,
        headerTitleAlign: "center",
        headerStyle: {
          borderColor: "#212121",
          borderBottomWidth: 1,
        },
      })}
    >
      <Tabs.Screen
        options={() => ({
          title: "Публікації",
        })}
        name="Posts"
        component={PostsScreen}
      />
      <Tabs.Screen
        options={() => ({
          title: "Створити публікацію",
          tabBarStyle: {
            display: "none",
          },
        })}
        name="CreatePosts"
        component={CreatePostsScreen}
      />
      <Tabs.Screen
        options={{ headerShown: false }}
        name="Profile"
        component={ProfileScreen}
      />
    </Tabs.Navigator>
  );
}

const styles = StyleSheet.create({
  iconTab: {
    height: 40,
    width: 70,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF6C00",
  },
  logOutIcon: {
    marginRight: 20,
  },
  backIcon: {
    marginLeft: 20,
  },
});
