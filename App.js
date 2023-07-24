import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import RegistrationScreen from "./src/Screens/RegistrationScreen";
import LoginScreen from "./src/Screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/Screens/HomeScreen";

const MainStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Login">
        <MainStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      </MainStack.Navigator>

      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
