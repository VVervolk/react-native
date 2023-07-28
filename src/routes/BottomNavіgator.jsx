import PostsScreen from "../Screens/BottomNavіgatorStack/PostsScreen";
import CreatePostsScreen from "../Screens/BottomNavіgatorStack/CreatePostsScreen";
import CommentsScreen from "../Screens/BottomNavіgatorStack/CommentsScreen";
import ProfileScreen from "../Screens/BottomNavіgatorStack/ProfileScreen";
import MapScreen from "../Screens/BottomNavіgatorStack/MapScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { Platform } from "react-native";

const Tabs = createBottomTabNavigator();

export default function BottomNavіgator() {
  const navigation = useNavigation();

  return (
    <Tabs.Navigator
      initialRouteName="Posts"
      backBehavior="none"
      screenOptions={({ route }) => ({
        headerLeft: () => {
          if (
            route.name === "CreatePosts" ||
            route.name === "Comments" ||
            route.name === "Map"
          ) {
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
        tabBarIcon: ({ focused }) => {
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

          return focused ? (
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
      <Tabs.Screen
        name="Comments"
        component={CommentsScreen}
        options={() => ({
          title: "Коментарі",
          tabBarButton: () => null,
          tabBarStyle: {
            display: "none",
          },
        })}
      />
      <Tabs.Screen
        name="Map"
        component={MapScreen}
        options={() => ({
          title: "Мапа",
          tabBarButton: () => null,
          tabBarStyle: {
            display: "none",
          },
        })}
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
