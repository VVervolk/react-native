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
import Example from "../../images/example.jpg";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

export default function CommentsScreen() {
  const [newComment, setNewComment] = useState(null);

  function sendNewComment() {
    setNewComment("");
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={styles.container}>
        <Image source={Example} style={styles.image} />
        {/* <FlatList/> */}

        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
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
              <AntDesign
                style={styles.icon}
                name="arrowup"
                size={24}
                color="#FFFFFF"
              />
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
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
  },
  image: {
    width: "100%",
    borderRadius: 8,
  },
  input: {
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
  icon: {
    borderRadius: 24,
    padding: 10,

    backgroundColor: "#FF6C00",
  },
  submitButton: {
    position: "absolute",
    top: 8,
    right: 8,
  },
});
