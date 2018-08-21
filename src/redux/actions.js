export const incrementAction = () => {
  return { type: 'INCREMENT' };
};

export const navbarLogin = () => {
  return { type: 'CLICKEDNAVBARLOGIN' };
};

export const getUsername = (e) => {
  return { type: 'USERNAME', payload: e.target.value };
};

export const getEmail = (e) => {
  return { type: 'EMAIL', payload: e.target.value };
};

export const getPassword = (e) => {
  return { type: 'PASSWORD', payload: e.target.value };
};

export const getConfirmPassword = (e) => {
  return { type: 'CONFIRMPASSWORD', payload: e.target.value };
};

export const getRegisterResponse = (res) => {
  return { type: 'REGISTERRESPONSE', payload: res };
};

export const authLogin = (res, user) => {
  if (res === 200)
    return { type: 'AUTH_LOGIN', payload: { res: res, user: user } };
};

export const logUserOut = () => {
  return { type: 'LOGOUT' };
};

export const getGames = (games) => {
  return { type: 'GAMES_LIST', payload: games };
};
