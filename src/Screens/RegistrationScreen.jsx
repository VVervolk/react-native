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
import { AntDesign } from "@expo/vector-icons";
import { useReducer, useState } from "react";
import Container from "../components/Container";
import Background from "../components/Background/Background";
import Title from "../components/Title";
import ShowPassword from "../components/ShowPassword";
import SubmitButton from "../components/SubmitButton";
import Form from "../components/Form";
import formReducer from "../reducers/formReducer";

export default function RegistrationScreen() {
  const [isFocusedLogin, setIsFocusedLogin] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPass, setIsFocusedPass] = useState(false);
  const [shouldHide, setShouldHide] = useState(true);
  const [state, dispatch] = useReducer(formReducer, {
    login: null,
    email: null,
    password: null,
  });

  const onReg = () => {
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
          <View style={styles.substrate}>
            <View style={styles.avatar}>
              <Pressable style={styles.addAvatarButton}>
                <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
              </Pressable>
            </View>
            <Title>Реєстрація</Title>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <Form>
                <TextInput
                  value={state.login}
                  onChangeText={(e) =>
                    dispatch({ type: "input_login", login: e })
                  }
                  inputMode="text"
                  style={[styles.input, isFocusedLogin && styles.inputFocused]}
                  placeholder="Логін"
                  onFocus={() => setIsFocusedLogin(true)}
                  onBlur={() => setIsFocusedLogin(false)}
                />
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
            <SubmitButton onPress={onReg}>Зареєстуватися</SubmitButton>
            <Pressable>
              <Text style={styles.loginLinkText}>Вже є акаунт? Увійти</Text>
            </Pressable>
          </View>
        </Background>
      </Container>
    </TouchableWithoutFeedback>
  );
}

export const styles = StyleSheet.create({
  substrate: {
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 92,
    paddingBottom: 32,
    paddingHorizontal: 16,
  },
  avatar: {
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: -50 }],
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  addAvatarButton: { position: "absolute", bottom: 14, right: -12 },

  input: {
    height: 50,
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
  },
  inputFocused: {
    borderColor: "#FF6C00",
    backgroundColor: "white",
  },

  loginLinkText: {
    fontSize: 16,
    color: "#1B4371",
    textAlign: "center",
    fontFamily: "Roboto",
  },
});
