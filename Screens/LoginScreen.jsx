import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Background from "../images/background.jpg";
import { styles } from "./RegistrationScreen";

export default function LoginScreen() {
  return (
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
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              inputMode="email"
              placeholder="Адреса електронної пошти"
            ></TextInput>

            <View>
              <TextInput
                inputMode="text"
                style={styles.input}
                placeholder="Пароль"
              ></TextInput>
              <Pressable style={styles.passwordButton}>
                <Text style={styles.passwordButtonText}>Показати</Text>
              </Pressable>
            </View>
          </View>
          <Pressable style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Увійти</Text>
          </Pressable>
          <Pressable style={loginStyles.loginLink}>
            <Text style={styles.loginLinkText}>Немає акаунту?</Text>
            <Text
              style={[
                styles.loginLinkText,
                { textDecorationLine: "underline" },
              ]}
            >
              Зареєструватися
            </Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}

const loginStyles = StyleSheet.create({
  loginLinkText: {
    fontSize: 16,
    color: "#1B4371",
    textAlign: "center",
    fontFamily: "Roboto",
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
