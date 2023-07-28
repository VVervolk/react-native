export default function reducer(state, action) {
  switch (action.type) {
    case "add_photo": {
      return {
        ...state,
        photo: action.photo,
      };
    }
    case "add_title": {
      return {
        ...state,
        title: action.title,
      };
    }
    case "add_place": {
      return {
        ...state,
        place: action.place,
      };
    }
    case "add_location": {
      return {
        ...state,
        location: action.location,
      };
    }
    case "reset": {
      return {
        photo: "",
        title: "",
        place: "",
        location: "",
        comments: [],
        likes: 0,
      };
    }
    default: {
      return state;
    }
  }
}
