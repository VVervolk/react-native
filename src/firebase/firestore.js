import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "./config";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  Timestamp,
  getDoc,
  addDoc,
} from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";

export async function addPost(state) {
  const response = await fetch(state.photo);
  const blob = await response.blob();

  const storageRef = ref(storage, `${state.email}_${Date.now()}`);
  const uploadTask = await uploadBytesResumable(storageRef, blob);
  const photo = await getDownloadURL(uploadTask.ref);
  const data = await addDoc(collection(db, `posts`), {
    ...state,
    photo: photo,
  });

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
