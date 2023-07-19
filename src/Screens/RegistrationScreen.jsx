import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Background from "../images/background.jpg";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";

export default function RegistrationScreen() {
  const [isPressed, setIsPressed] = useState(false);
  const [isFocusedLogin, setIsFocusedLogin] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPass, setIsFocusedPass] = useState(false);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={Background}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.substrate}>
          <View style={styles.avatar}>
            <Pressable style={styles.addAvatarButton}>
              <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
            </Pressable>
          </View>
          <Text style={styles.title}>Реєстрація</Text>
          <View style={styles.form}>
            <TextInput
              inputMode="text"
              style={[
                styles.input,
                {
                  borderColor: isFocusedLogin ? "#FF6C00" : "#E8E8E8",
                  backgroundColor: isFocusedLogin ? "white" : "#F6F6F6",
                },
              ]}
              placeholder="Логін"
              onFocus={() => setIsFocusedLogin(true)}
              onBlur={() => setIsFocusedLogin(false)}
            />
            <TextInput
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
          >
            <Text
              style={[
                styles.submitButtonText,
                { color: isPressed ? "#FF6C00" : "white" },
              ]}
            >
              Зареєстуватися
            </Text>
          </Pressable>
          <Pressable style={styles.loginLink}>
            <Text style={styles.loginLinkText}>Вже є акаунт? Увійти</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: 350,
    width: "100%",
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  title: {
    color: "#212121",
    fontSize: 30,
    lineHeight: 35,
    fontWeight: 500,
    textAlign: "center",
    fontFamily: "Roboto",
    marginBottom: 32,
  },
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

  form: {
    gap: 16,
    paddingBottom: 43,
  },
  input: {
    height: 50,
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
  },
  passwordButton: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  passwordButtonText: {
    color: "#1B4371",
    fontFamily: "Roboto",
    fontSize: 16,
    lineHeight: 18.75,
  },
  submitButton: {
    height: 51,
    borderRadius: 100,
    justifyContent: "center",
    marginBottom: 16,
    borderWidth: 2,
  },
  submitButtonText: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Roboto",
  },
  loginLinkText: {
    fontSize: 16,
    color: "#1B4371",
    textAlign: "center",
    fontFamily: "Roboto",
  },
});
