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
import { useEffect, useReducer, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import addPostReducer from "../../reducers/addPostReducer";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

export default function CreatePostsScreen() {
  const [state, dispatch] = useReducer(addPostReducer, {
    title: "",
    location: "",
    photo: null,
  });
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  async function onSubmit() {
    console.log(state);
    await getLocation();
    dispatch({ type: "reset" });
    navigation.navigate("Posts");
  }

  async function getLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
    }

    let location = await Location.getCurrentPositionAsync({});
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setLocation(coords);
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={stylesCreatePost.container}>
        <View>
          <Camera
            type={type}
            ref={setCameraRef}
            style={stylesCreatePost.camera}
          >
            <View style={stylesCreatePost.photoView}>
              <TouchableOpacity
                style={stylesCreatePost.flipContainer}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
              >
                <Text style={{ fontSize: 18, color: "white" }}>Flip</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={stylesCreatePost.takePhotoButton}
                onPress={async () => {
                  if (cameraRef) {
                    const { uri } = await cameraRef.takePictureAsync();
                    await MediaLibrary.createAssetAsync(uri);
                  }
                }}
              >
                <MaterialIcons
                  style={stylesCreatePost.icon}
                  name="photo-camera"
                  size={20}
                  color={"#BDBDBD"}
                />
              </TouchableOpacity>
            </View>
          </Camera>
          <Text style={stylesCreatePost.text}>Завантажте фото</Text>
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
            disabled={state.title && state.location ? false : true}
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
  camera: {
    width: "100%",
    height: 240,
    marginBottom: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  photoView: {
    flex: 1,
    width: "100%",
    backgroundColor: "transparent",
    justifyContent: "center",
  },
  flipContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  takePhotoButton: {
    alignSelf: "center",
  },
  icon: {
    padding: 18,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
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
