import {
  Alert,
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
import Background from "../components/Background";
import Title from "../components/Title";
import ShowPassword from "../components/ShowPassword";
import SubmitButton from "../components/SubmitButton";
import Form from "../components/Form";
import formReducer from "../reducers/formReducer";
import { useNavigation } from "@react-navigation/native";
import toggleHidePassword from "../helpers/toggleHidePassword";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/operations";

export default function RegistrationScreen() {
  const [isFocusedLogin, setIsFocusedLogin] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPass, setIsFocusedPass] = useState(false);
  const [shouldHide, setShouldHide] = useState(true);
  const [state, dispatch] = useReducer(formReducer, {
    login: "",
    email: "",
    password: "",
  });
  const [isLogIn, setIsLogIn] = useState(false);
  const navigation = useNavigation();
  const dispatchSlice = useDispatch();

  async function onReg() {
    try {
      if (!state.email || !state.password) {
        Alert.alert("Error", "Put down all credentials");
        return;
      }
      setIsLogIn(true);
      const data = await dispatchSlice(registerUser(state));
      if (data.error) {
        console.log(data.error);
        return;
      }
      dispatch({ type: "reset" });
      navigation.reset({
        index: 0,
        routes: [{ name: "BottomNavіgator" }],
      });
      setIsLogIn(false);
    } catch (error) {}
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.interlayer}>
        <Container>
          <Background>
            <View style={styles.substrateRegister}>
              <View style={styles.avatar}>
                <Pressable style={styles.addAvatarButton}>
                  <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
                </Pressable>
              </View>
              <View style={styles.box}>
                <Title>Реєстрація</Title>
                <KeyboardAvoidingView
                  behavior={Platform.OS == "ios" ? "padding" : "height"}
                >
                  <Form>
                    <TextInput
                      readOnly={isLogIn}
                      value={state.login}
                      onChangeText={(e) =>
                        dispatch({ type: "input_login", login: e })
                      }
                      inputMode="text"
                      style={[
                        styles.input,
                        isFocusedLogin && styles.inputFocused,
                      ]}
                      placeholder="Логін"
                      onFocus={() => setIsFocusedLogin(true)}
                      onBlur={() => setIsFocusedLogin(false)}
                    />
                    <TextInput
                      readOnly={isLogIn}
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
                        readOnly={isLogIn}
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
                <SubmitButton isLogIn={isLogIn} onPress={onReg}>
                  Зареєстуватися
                </SubmitButton>
                <Pressable
                  disabled={isLogIn}
                  style={styles.loginLink}
                  onPress={() => navigation.navigate("Login")}
                >
                  <Text style={styles.loginLinkText}>Вже є акаунт? Увійти</Text>
                </Pressable>
              </View>
            </View>
          </Background>
        </Container>
      </View>
    </TouchableWithoutFeedback>
  );
}

export const styles = StyleSheet.create({
  substrateRegister: {
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingBottom: 50,
    paddingHorizontal: 16,
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    top: -60,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  addAvatarButton: { position: "absolute", bottom: 14, right: -12 },
  box: {
    width: "100%",
    top: -28,
  },
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
  loginLink: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },

  loginLinkText: {
    fontSize: 16,
    color: "#1B4371",
    textAlign: "center",
  },
  interlayer: {
    flex: 1,
  },
});
