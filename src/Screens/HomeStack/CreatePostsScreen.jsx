import {
  Pressable,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { useReducer } from "react";
import Example from "../../images/example.jpg";
import { ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import addPostReducer from "../../reducers/addPostReducer";

export default function CreatePostsScreen() {
  const [state, dispatch] = useReducer(addPostReducer, {
    title: "",
    location: "",
    photo: null,
  });

  const navigation = useNavigation();

  const onSubmit = () => {
    console.log(state);
    dispatch({ type: "reset" });
    navigation.navigate("Posts");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={stylesCreatePost.container}>
        <View>
          <View style={stylesCreatePost.addPictureZone}>
            <TouchableOpacity
              onPress={() => dispatch({ type: "add_photo", photo: Example })}
            >
              {state.photo ? (
                <ImageBackground
                  source={state.photo}
                  style={stylesCreatePost.addPictureBtn}
                >
                  <MaterialIcons
                    style={[
                      stylesCreatePost.icon,
                      {
                        backgroundColor: "rgba(255, 255, 255, 0.3)",
                      },
                    ]}
                    name="photo-camera"
                    size={20}
                    color={state.photo ? "#FFFFFF" : "#BDBDBD"}
                  />
                </ImageBackground>
              ) : (
                <View
                  style={[
                    stylesCreatePost.addPictureBtn,
                    { backgroundColor: "#F6F6F6" },
                  ]}
                >
                  <MaterialIcons
                    style={stylesCreatePost.icon}
                    name="photo-camera"
                    size={20}
                    color={state.photo ? "#FFFFFF" : "#BDBDBD"}
                  />
                </View>
              )}
            </TouchableOpacity>
            <Text style={stylesCreatePost.text}>Завантажте фото</Text>
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View style={stylesCreatePost.form}>
              <TextInput
                style={stylesCreatePost.input}
                inputMode="text"
                placeholder="Назва..."
                placeholderTextColor="#BDBDBD"
                value={state.title}
                onChangeText={(e) => dispatch({ type: "add_title", title: e })}
              />

              <View>
                <Feather
                  name="map-pin"
                  size={24}
                  color={"#BDBDBD"}
                  style={stylesCreatePost.inputIcon}
                />

                <TextInput
                  style={[stylesCreatePost.input, { paddingLeft: 28 }]}
                  inputMode="text"
                  placeholder="Місцевість..."
                  placeholderTextColor="#BDBDBD"
                  value={state.location}
                  onChangeText={(e) =>
                    dispatch({ type: "add_location", location: e })
                  }
                />
              </View>
            </View>
          </KeyboardAvoidingView>
          <Pressable
            style={[
              stylesCreatePost.submitButton,
              state.photo &&
                state.title &&
                state.location && { backgroundColor: "#FF6C00" },
            ]}
            onPress={onSubmit}
          >
            <Text
              style={[
                stylesCreatePost.submitButtonText,
                state.photo &&
                  state.title &&
                  state.location && { color: "#FFFFFF" },
              ]}
            >
              Опублікувати
            </Text>
          </Pressable>
        </View>
        <Pressable
          style={stylesCreatePost.deleteButton}
          onPress={() => {
            dispatch({ type: "reset" });
          }}
        >
          <Feather name="trash-2" size={24} color={"#BDBDBD"} />
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
}

export const stylesCreatePost = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
    paddingBottom: 34,
    justifyContent: "space-between",
  },
  addPictureZone: {
    marginBottom: 32,
  },
  addPictureBtn: {
    backgroundColor: "#E8E8E8",
    width: "100%",
    height: 240,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  icon: {
    padding: 18,
    borderRadius: 30,
  },
  text: {
    fontSize: 16,
    color: "#BDBDBD",
  },
  form: {
    gap: 16,
    marginBottom: 32,
  },
  input: {
    paddingVertical: 16,
    paddingRight: 16,
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    fontSize: 16,
  },
  inputIcon: {
    top: 18,
    position: "absolute",
  },
  submitButton: {
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 120,
    paddingVertical: 16,
    backgroundColor: "#F6F6F6",
  },
  submitButtonText: {
    fontSize: 16,
    color: "#BDBDBD",
  },
  deleteButton: {
    alignSelf: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    width: 70,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
