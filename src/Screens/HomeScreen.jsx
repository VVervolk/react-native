import { createStackNavigator } from "@react-navigation/stack";
import PostsScreen from "./HomeStack/PostsScreen";
import CreatePostsScreen from "./HomeStack/CreatePostsScreen";
import CommentsScreen from "./HomeStack/CommentsScreen";
import ProfileScreen from "./HomeStack/ProfileScreen";
import MapScreen from "./HomeStack/MapScreen";

const HomeStack = createStackNavigator();

export default function HomeScreen() {
  return (
    <HomeStack.Navigator initialRouteName="PostsScreen">
      <HomeStack.Screen
        name="Posts"
        component={PostsScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Map"
        component={MapScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}
