const initialState = {
  games: [],
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
    case 'GAMES_LIST':
      return { ...state, games: action.payload };
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
        loggedInUser: action.payload.user,
        usernameInputField: action.payload.user,
        loginResponse: action.payload.res
      };
    case 'LOGOUT':
      state = initialState;
      return state;
    default:
      return state;
  }
}
