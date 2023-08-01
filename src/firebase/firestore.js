import { db } from "./config";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  Timestamp,
} from "firebase/firestore";

export async function addPost({ state, email }) {
  const data = await addDoc(collection(db, `${email}`), state);
  return data.id;
}

export async function getPosts(email) {
  const data = await getDocs(collection(db, `${email}`));

  const posts = [];
  data.forEach((doc) => posts.push({ id: doc.id, ...doc.data() }));

  return posts;
}

export async function addComment({ email, id, newComment }) {
  const data = await updateDoc(doc(db, `${email}`, `${id}`), {
    comments: arrayUnion({
      text: newComment,
      time: Timestamp.now().toDate().toString(),
      email,
    }),
  });
}
