// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDB3ZQamktoF7-J4Pn0JRPkifIOi_hoS2I",
  authDomain: "react-native-8df5a.firebaseapp.com",
  projectId: "react-native-8df5a",
  storageBucket: "react-native-8df5a.appspot.com",
  messagingSenderId: "461731484140",
  appId: "1:461731484140:web:48a70e748c27ecac19f0c9",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
