import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "./config";
import { Alert } from "react-native";

/**
 * Функция для регистрации
 * @param {email, password, login} param0
 * @returns data.user
 */
export async function registerDB({ email, password, login }) {
  try {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    if (data && login) {
      await addUserName(login);
    }
    return data.user;
  } catch (error) {
    switch (error.code) {
      case "auth/email-already-in-use":
        Alert.alert("Error", "Oops, this email is already used");
        break;

      case "auth/invalid-email":
        Alert.alert("Error", "Oops, this email address is not valid");
        break;

      case "auth/weak-password":
        Alert.alert("Error", "Oops, your password isn`t strong enough");
        break;

      default:
        Alert.alert("Error", "Oops, something went wrong");
        break;
    }
  }
}

const authStateChanged = async (onChange = () => {}) => {
  onAuthStateChanged((user) => {
    onChange(user);
  });
};

/**
 * Функция для логина
 * @param {email, password} param0
 * @returns credentials.user
 */
export const loginDB = async ({ email, password }) => {
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    return credentials.user;
  } catch (error) {
    console.log(error);
    switch (error.code) {
      case "auth/user-not-found":
        Alert.alert("Error", "Oops, wrong credentials");
        break;
      case "auth/wrong-password":
        Alert.alert("Error", "Oops, wrong credentials");
        break;
      case "auth/invalid-email":
        Alert.alert("Error", "Oops, email address isn`t valid");
        break;
      case "auth/too-many-requests":
        Alert.alert("Error", "Oops, too many requests");
        break;

      default:
        Alert.alert("Error", "Oops, something went wrong");
        break;
    }
  }
};

export const user = auth.currentUser;

const updateUserProfile = async (update) => {
  // якщо такий користувач знайдений
  if (user) {
    // оновлюємо його профайл
    try {
      await updateProfile(user, update);
    } catch (error) {
      throw error;
    }
  }
};

/**
 * Функция для добавления имени пользователя в аккаунт при рег
 * @param {string} userName
 */
async function addUserName(userName) {
  try {
    await updateProfile(auth.currentUser, {
      displayName: userName,
    });
  } catch (error) {
    console.error(error);
  }
}

/**
 *Функция для разлогина
 * @returns
 */
export async function logOut() {
  await signOut(auth);
}
