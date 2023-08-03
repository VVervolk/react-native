import { db } from "./config";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  Timestamp,
  setDoc,
  getDoc,
  where,
  addDoc,
  onSnapshot,
} from "firebase/firestore";

export async function addPost(state) {
  const data = await addDoc(collection(db, `posts`), state);
  return data.id;
}

export async function getPostsFetch() {
  try {
    const data = await getDocs(collection(db, "posts"));

    const posts = [];
    data.forEach((doc) =>
      posts.push({
        id: doc.id,
        ...doc.data(),
      })
    );

    return posts;
  } catch (error) {
    console.log(error);
  }
}

export async function getPostsUser(email) {
  try {
    const data = await getDoc(doc(db, "posts", `${email}`));

    const posts = data.data().posts;

    return posts;
  } catch (error) {
    console.log(error);
  }
}

export async function addComment({ id, userEmail, newComment }) {
  const data = await updateDoc(doc(db, "posts", `${id}`), {
    comments: arrayUnion({
      text: newComment,
      time: Timestamp.now().toDate().toString(),
      userEmail,
    }),
  });
}

export async function subscribeOnComments(id) {
  const unsub = await onSnapshot(doc(db, "posts", `${id}`), (doc) => {
    const com = [];

    const data = doc.data().comments;
    data.forEach((item) => {
      com.push(item);
    });
    return com;
  });
}
