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

export default function LoginScreen() {
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPass, setIsFocusedPass] = useState(false);
  const [shouldHide, setShouldHide] = useState(true);
  const [state, dispatch] = useReducer(formReducer, {
    email: null,
    password: null,
  });

  const onLog = () => {
    console.log(state);
    dispatch({ type: "reset" });
  };

  const toggleHidePassword = () => {
    if (shouldHide) {
      setShouldHide(false);
    } else {
      setShouldHide(true);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Background>
          <View style={[styles.substrate, loginStyles.substrateLogin]}>
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
                  style={[styles.input, isFocusedEmail && styles.inputFocused]}
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
                    style={[styles.input, isFocusedPass && styles.inputFocused]}
                    placeholder="Пароль"
                    secureTextEntry={shouldHide}
                    onFocus={() => setIsFocusedPass(true)}
                    onBlur={() => setIsFocusedPass(false)}
                  />
                  <ShowPassword
                    onPress={() => {
                      toggleHidePassword();
                    }}
                  >
                    {shouldHide ? "Показати" : "Скрити"}
                  </ShowPassword>
                </View>
              </Form>
            </KeyboardAvoidingView>

            <SubmitButton onPress={onLog}>Увійти</SubmitButton>
            <Pressable style={loginStyles.loginLink}>
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
    </TouchableWithoutFeedback>
  );
}

const loginStyles = StyleSheet.create({
  substrateLogin: {
    paddingTop: 32,
    paddingBottom: 144,
  },
  loginLink: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
  },
  loginLinkTextUnderline: {
    textDecorationLine: "underline",
  },
});
