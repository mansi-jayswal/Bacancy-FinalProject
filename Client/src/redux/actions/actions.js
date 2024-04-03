import { LOGIN_USER, LOGOUT_USER } from '../actions/actionTypes';

export const loginUser = (user) => ({
  type: LOGIN_USER,
  payload: user,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});