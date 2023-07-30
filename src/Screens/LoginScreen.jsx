import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { styles } from "./RegistrationScreen";
import { useReducer, useState } from "react";
import Container from "../components/Container";
import Background from "../components/Background";
import Title from "../components/Title";
import ShowPassword from "../components/ShowPassword";
import SubmitButton from "../components/SubmitButton";
import Form from "../components/Form";
import formReducer from "../reducers/formReducer";
import { useNavigation } from "@react-navigation/native";
import toggleHidePassword from "../helpers/toggleHidePassword";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/operations";
import { user } from "../firebase/auth";

export default function LoginScreen() {
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPass, setIsFocusedPass] = useState(false);
  const [shouldHide, setShouldHide] = useState(true);
  const [state, dispatch] = useReducer(formReducer, {
    email: null,
    password: null,
  });
  const navigation = useNavigation();
  const dispatchSlice = useDispatch();

  async function onLog() {
    try {
      // const data = await dispatchSlice(loginUser(state));
      // console.log(data);
      // if (data.error) {
      //   throw new Error(`Oops, something went wrong`);
      // }
      dispatch({ type: "reset" });
      navigation.reset({
        index: 0,
        routes: [{ name: "BottomNavіgator" }],
      });
    } catch (error) {
      console.error(`${error.name}: ${error.message}`);
    }
  }

  // console.log(user?.email);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.interlayer}>
        <Container>
          <Background>
            <View style={loginStyles.substrateLogin}>
              <Title>Увійти</Title>
              <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
              >
                <Form>
                  <TextInput
                    value={state.email}
                    onChangeText={(e) =>
                      dispatch({ type: "input_email", email: e })
                    }
                    style={[
                      styles.input,
                      isFocusedEmail && styles.inputFocused,
                    ]}
                    inputMode="email"
                    placeholder="Адреса електронної пошти"
                    onFocus={() => setIsFocusedEmail(true)}
                    onBlur={() => setIsFocusedEmail(false)}
                  />

                  <View>
                    <TextInput
                      value={state.password}
                      onChangeText={(e) =>
                        dispatch({ type: "input_password", password: e })
                      }
                      inputMode="text"
                      style={[
                        styles.input,
                        isFocusedPass && styles.inputFocused,
                      ]}
                      placeholder="Пароль"
                      secureTextEntry={shouldHide}
                      onFocus={() => setIsFocusedPass(true)}
                      onBlur={() => setIsFocusedPass(false)}
                    />
                    <ShowPassword
                      onPress={() => {
                        toggleHidePassword(shouldHide, setShouldHide);
                      }}
                    >
                      {shouldHide ? "Показати" : "Скрити"}
                    </ShowPassword>
                  </View>
                </Form>
              </KeyboardAvoidingView>

              <SubmitButton onPress={onLog}>Увійти</SubmitButton>
              <Pressable
                style={[styles.loginLink, { gap: 4 }]}
                onPress={() => navigation.navigate("Registration")}
              >
                <Text style={styles.loginLinkText}>Немає акаунту?</Text>
                <Text
                  style={[
                    styles.loginLinkText,
                    loginStyles.loginLinkTextUnderline,
                  ]}
                >
                  Зареєструватися
                </Text>
              </Pressable>
            </View>
          </Background>
        </Container>
      </View>
    </TouchableWithoutFeedback>
  );
}

const loginStyles = StyleSheet.create({
  substrateLogin: {
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 144,
  },

  loginLinkTextUnderline: {
    textDecorationLine: "underline",
  },
});
