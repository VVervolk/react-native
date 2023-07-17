import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Background from "../images/background.jpg";
import Plus from "../images/add.png";

export default function RegistrationScreen() {
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
              <Image source={Plus} style={styles.addAvatarButtonIcon} />
            </Pressable>
          </View>
          <Text style={styles.title}>Реєстрація</Text>
          <View style={styles.form}>
            <TextInput
              inputMode="text"
              style={styles.input}
              placeholder="Логін"
            ></TextInput>
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
            <Text style={styles.submitButtonText}>Зареєстуватися</Text>
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
    left: 128,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  addAvatarButton: { position: "absolute", bottom: 14, right: -12 },
  addAvatarButtonIcon: {
    width: 25,
    height: 25,
  },
  form: {
    gap: 16,
    paddingBottom: 43,
  },
  input: {
    height: 50,
    backgroundColor: "#F6F6F6",
    padding: 16,
    borderColor: "#E8E8E8",
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
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    justifyContent: "center",
    marginBottom: 16,
  },
  submitButtonText: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Roboto",
    color: "white",
  },
  loginLinkText: {
    fontSize: 16,
    color: "#1B4371",
    textAlign: "center",
    fontFamily: "Roboto",
  },
});
