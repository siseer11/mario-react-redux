const initState = {
  authError: null
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCES":
      return {
        ...state,
        authError: null
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        authError: "Login failed!"
      };
    case "SIGNOUT_SUCCES":
      return state;
    case "SIGNUP_SUCCES":
      console.log("account created");
      return state;
    case "SIGNUP_ERROR":
      return {
        ...state,
        authError: action.error
      };
    default:
      return state;
  }
};

export default authReducer;
