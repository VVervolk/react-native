export default function reducer(state, action) {
  switch (action.type) {
    case "input_login": {
      return {
        ...state,
        login: action.login,
      };
    }
    case "input_email": {
      return {
        ...state,
        email: action.email,
      };
    }
    case "input_password": {
      return {
        ...state,
        password: action.password,
      };
    }
    case "reset": {
      return {
        login: null,
        email: null,
        password: null,
      };
    }
    default: {
      return state;
    }
  }
}
