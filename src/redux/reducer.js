const initialState = {
  clickedNavbarLoginButton: false,
  loggedInUser: null,
  usernameInputField: null,
  emailInputField: null,
  registerResponse: null,
  loggedIn: false,
  loginResponse: null
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case 'USERNAME':
      return { ...state, usernameInputField: action.payload };
    case 'EMAIL':
      return { ...state, emailInputField: action.payload.toLowerCase() };
    case 'CLICKEDNAVBARLOGIN':
      return { ...state, clickedNavbarLoginButton: true };
    case 'REGISTERRESPONSE':
      return { ...state, registerResponse: action.payload };
    case 'AUTH_LOGIN':
      return {
        ...state,
        loggedIn: true,
        usernameInputField: action.payload.user,
        loginResponse: action.payload.res
      };
    default:
      return state;
  }
}
