import { createStackNavigator } from "@react-navigation/stack";
import RegistrationScreen from "../Screens/RegistrationScreen";
import LoginScreen from "../Screens/LoginScreen";
import BottomNavіgator from "../routes/BottomNavіgator";
const MainStack = createStackNavigator();

export default function MainNavigator() {
  return (
    <MainStack.Navigator initialRouteName="Login" backBehavior="none">
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
        name="BottomNavіgator"
        component={BottomNavіgator}
        options={{ headerShown: false }}
      />
    </MainStack.Navigator>
  );
}
