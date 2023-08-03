import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  ScrollView,
  FlatList,
} from "react-native";
import { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addCommentOnPost } from "../../redux/operations";
import { selectUser } from "../../redux/selectors";
import Comment from "../../components/Comment";
import { getNewComments, subscribeOnComments } from "../../firebase/firestore";

export default function CommentsScreen() {
  const [newComment, setNewComment] = useState(null);
  const dispatch = useDispatch();
  const { email } = useSelector(selectUser);
  const {
    params: { ownerEmail, photo, comments, id },
  } = useRoute();

  // const [postComments, setPostComments] = useState([]);

  useEffect(() => {
    const c = subscribeOnComments(id);
    console.log(object);

    // setPostComments(comments);
  }, []);

  function sendNewComment() {
    dispatch(addCommentOnPost({ userEmail: email, id, newComment }));
    // setPostComments((state) => {
    //   return [
    //     ...state,
    //     { text: newComment, time: new Date().toString(), email },
    //   ];
    // });
    setNewComment("");
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image source={{ uri: photo }} style={styles.image} />
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.comments}
          data={comments}
          renderItem={({ item }) => (
            <Comment userEmail={email} comment={item} />
          )}
          keyExtractor={({ item }) => Math.random()}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        >
          <View>
            <TextInput
              value={newComment}
              onChangeText={(e) => setNewComment(e)}
              style={styles.input}
              inputMode="text"
              placeholder="Коментувати..."
              placeholderTextColor="#BDBDBD"
            />
            <Pressable
              style={styles.submitButton}
              onPress={() => sendNewComment()}
            >
              <AntDesign name="arrowup" size={24} color="#FFFFFF" />
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "white",
    paddingBottom: 16,
    paddingTop: 32,
    justifyContent: "space-between",
  },
  image: {
    width: "100%",
    borderRadius: 8,
    height: 240,
  },
  input: {
    height: 50,
    fontSize: 16,
    fontWeight: "500",
    paddingVertical: 16,
    paddingLeft: 16,
    paddingRight: 46,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  submitButton: {
    width: 34,
    height: 34,
    position: "absolute",
    top: 8,
    right: 8,
    borderRadius: 24,
    backgroundColor: "#FF6C00",
    alignItems: "center",
    justifyContent: "center",
  },
  comments: {
    width: "100%",
    justifyContent: "flex-start",
    paddingVertical: 32,
    gap: 24,
  },
});
