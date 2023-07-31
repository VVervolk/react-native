import {
  Pressable,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
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
import { addNewPost } from "../../redux/operations";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/selectors";

export default function CreatePostsScreen() {
  const [state, dispatch] = useReducer(addPostReducer, {
    title: "",
    place: "",
    photo: "",
    location: "",
    comments: [],
    likes: 0,
  });
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isLoading, setIsLoading] = useState(false);
  const [isPhotoLoading, setIsPhotoLoading] = useState(false);
  const dispatchSlice = useDispatch();
  const { email } = useSelector(selectUser);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
    getLocation();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  async function onSubmit() {
    try {
      setIsLoading(true);
      dispatchSlice(addNewPost({ state, email }));
      dispatch({ type: "reset" });
      navigation.navigate("Posts");
      setIsLoading(false);
    } catch (error) {}
  }

  async function getLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
    }

    let loc = await Location.getCurrentPositionAsync({});
    const coords = {
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    };
    dispatch({ type: "add_location", location: coords });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={stylesCreatePost.container}>
        {isLoading ? (
          <View style={stylesCreatePost.loading}>
            <Text>Loading...</Text>
          </View>
        ) : (
          <>
            <View style={stylesCreatePost.cameraBox}>
              {state.photo ? (
                <ImageBackground
                  style={stylesCreatePost.userPhoto}
                  source={{ uri: state.photo }}
                />
              ) : (
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
                      disabled={isPhotoLoading ? true : false}
                      onPress={async () => {
                        if (cameraRef) {
                          setIsPhotoLoading(true);
                          const { uri } = await cameraRef.takePictureAsync();
                          await MediaLibrary.createAssetAsync(uri);
                          dispatch({ type: "add_photo", photo: uri });
                          setIsPhotoLoading(false);
                        }
                      }}
                    >
                      <MaterialIcons
                        style={stylesCreatePost.icon}
                        name="photo-camera"
                        size={20}
                        color={isPhotoLoading ? "#BDBDBD" : "white"}
                      />
                    </TouchableOpacity>
                  </View>
                </Camera>
              )}
            </View>
            <Text style={stylesCreatePost.text}>Завантажте фото</Text>
            <KeyboardAvoidingView
              style={{ flexGrow: 1 }}
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <View style={stylesCreatePost.form}>
                <TextInput
                  style={stylesCreatePost.input}
                  inputMode="text"
                  placeholder="Назва..."
                  placeholderTextColor="#BDBDBD"
                  value={state.title}
                  onChangeText={(e) =>
                    dispatch({ type: "add_title", title: e })
                  }
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
                    value={state.place}
                    onChangeText={(e) =>
                      dispatch({ type: "add_place", place: e })
                    }
                  />
                </View>
              </View>
              <Pressable
                disabled={state.photo ? false : true}
                style={[
                  stylesCreatePost.submitButton,
                  state.photo && { backgroundColor: "#FF6C00" },
                ]}
                onPress={onSubmit}
              >
                <Text
                  style={[
                    stylesCreatePost.submitButtonText,
                    state.photo && { color: "#FFFFFF" },
                  ]}
                >
                  Опублікувати
                </Text>
              </Pressable>
              <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <Pressable
                  style={stylesCreatePost.deleteButton}
                  onPress={() => {
                    dispatch({ type: "reset" });
                  }}
                >
                  <Feather name="trash-2" size={24} color={"#BDBDBD"} />
                </Pressable>
              </View>
            </KeyboardAvoidingView>
          </>
        )}
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
  },
  loading: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  userPhoto: {
    width: "100%",
    height: 240,
  },
  camera: {
    display: "flex",
    width: "100%",
    height: 240,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  cameraBox: {
    overflow: "hidden",
    borderRadius: 8,
    marginBottom: 8,
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
