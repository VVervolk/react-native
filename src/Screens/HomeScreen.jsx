import { createStackNavigator } from "@react-navigation/stack";
import PostsScreen from "./HomeStack/PostsScreen";
import CreatePostsScreen from "./HomeStack/CreatePostsScreen";
import CommentsScreen from "./HomeStack/CommentsScreen";
import ProfileScreen from "./HomeStack/ProfileScreen";
import MapScreen from "./HomeStack/MapScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Tabs = createBottomTabNavigator();

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <Tabs.Navigator
      initialRouteName="Posts"
      backBehavior="initialRoute"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          let iconColor = focused ? "white" : "#212121";
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

          return (
            <TouchableOpacity
              onPress={() => navigation.navigate(route.name)}
              style={[styles.iconTab, focused && styles.activeIcon]}
            >
              <Feather name={iconName} size={24} color={iconColor} />
            </TouchableOpacity>
          );
        },

        tabBarShowLabel: false,
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
  },
  activeIcon: {
    backgroundColor: "#FF6C00",
  },
  logOutIcon: {
    marginRight: 20,
  },
  backIcon: {
    marginLeft: 20,
  },
});
