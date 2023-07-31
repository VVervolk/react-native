import { db } from "./config";
import { collection, addDoc, getDocs } from "firebase/firestore";

export async function addPost({ state, email }) {
  const data = await addDoc(collection(db, `${email}`), state);
  return data.id;
}

export async function getPosts(email) {
  console.log("email", email);
  const data = await getDocs(collection(db, `${email}`));

  const posts = [];
  data.forEach((doc) => posts.push({ id: doc.id, ...doc.data() }));

  return posts;
}
