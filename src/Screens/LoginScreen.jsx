import {
  ImageBackground,
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
import Background from "../images/background.jpg";
import { styles } from "./RegistrationScreen";
import { useReducer, useState } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "input_email": {
      return {
        ...state,
        email: action.email,
      };
    }
    case "input_password": {
      return {
        ...state,
        password: action.password,
      };
    }
    default: {
      return state;
    }
  }
}

export default function LoginScreen() {
  const [isPressed, setIsPressed] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPass, setIsFocusedPass] = useState(false);
  const [state, dispatch] = useReducer(reducer, {
    email: null,
    password: null,
  });

  const onLog = () => console.log(state);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          source={Background}
          resizeMode="cover"
          style={styles.image}
        >
          <View
            style={[styles.substrate, { paddingTop: 32, paddingBottom: 144 }]}
          >
            <Text style={styles.title}>Увійти</Text>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <View style={styles.form}>
                <TextInput
                  value={state.email}
                  onChangeText={(e) =>
                    dispatch({ type: "input_email", email: e })
                  }
                  style={[
                    styles.input,
                    {
                      borderColor: isFocusedEmail ? "#FF6C00" : "#E8E8E8",
                      backgroundColor: isFocusedEmail ? "white" : "#F6F6F6",
                    },
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
                      {
                        borderColor: isFocusedPass ? "#FF6C00" : "#E8E8E8",
                        backgroundColor: isFocusedPass ? "white" : "#F6F6F6",
                      },
                    ]}
                    placeholder="Пароль"
                    secureTextEntry={true}
                    onFocus={() => setIsFocusedPass(true)}
                    onBlur={() => setIsFocusedPass(false)}
                  />
                  <Pressable style={styles.passwordButton}>
                    <Text style={styles.passwordButtonText}>Показати</Text>
                  </Pressable>
                </View>
              </View>
            </KeyboardAvoidingView>

            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "white" : "#FF6C00",
                  borderColor: pressed ? "#FF6C00" : "white",
                },
                styles.submitButton,
              ]}
              onPressIn={() => {
                setIsPressed(true);
              }}
              onPressOut={() => {
                setIsPressed(false);
              }}
              onPress={onLog}
            >
              <Text
                style={[
                  styles.submitButtonText,
                  { color: isPressed ? "#FF6C00" : "white" },
                ]}
              >
                Увійти
              </Text>
            </Pressable>
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
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const loginStyles = StyleSheet.create({
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
