const initialState = {
  users: [],
  games: [],
  userGames: [],
  userFriends: [],
  clickedNavbarLoginButton: false,
  loggedInUser: null,
  loggedInUserId: null,
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
    case 'ALL_USERS':
      return { ...state, users: action.payload };
    case 'GAMES_LIST':
      return { ...state, games: action.payload };
    case 'USER_GAMES':
      return { ...state, userGames: action.payload };
    case 'USER_FRIENDS':
      return { ...state, userFriends: action.payload };
    case 'EMAIL':
      return { ...state, emailInputField: action.payload.toLowerCase() };
    case 'CLICKEDNAVBARLOGIN':
      return { ...state, clickedNavbarLoginButton: true };
    case 'REGISTERRESPONSE':
      return { ...state, registerResponse: action.payload };
    case 'CLEAR_REG_RESPONSE':
      return { ...state, registerResponse: null };
    case 'AUTH_LOGIN':
      return {
        ...state,
        loggedIn: true,
        loggedInUser: action.payload.user,
        loggedInUserId: action.payload.userId,
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
