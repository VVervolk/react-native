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
} from "firebase/firestore";

export async function initArray(email, login) {
  const data = await setDoc(doc(db, "posts", `${email}`), {
    posts: [],
    user: { email, name: login },
  });
}

export async function addPost({ state, email }) {
  const data = await updateDoc(doc(db, "posts", `${email}`), {
    posts: arrayUnion(state),
  });
}

export async function getPosts() {
  try {
    const data = await getDocs(collection(db, "posts"));

    const posts = [];
    data.forEach((doc) =>
      posts.push({
        user: { ...doc.data().user },
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

export async function addComment({ ownerEmail, id, userEmail, newComment }) {
  const data = await updateDoc(
    doc(db, "posts", `${ownerEmail}`),
    where("posts"),
    {
      comments: arrayUnion({
        text: newComment,
        time: Timestamp.now().toDate().toString(),
        userEmail,
      }),
    }
  );
}
