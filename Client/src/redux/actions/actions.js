// import { signupUser } from '../../utils/axios';
// import { LOGIN_USER, LOGIN_USER_INFO, LOGOUT_USER } from '../actions/actionTypes';

// export const loginUser = (user) => ({
//   type: LOGIN_USER,
//   payload: user,
// });

// export const logoutUser = () => ({
//   type: LOGOUT_USER,
// });

// export const signupUserRequest = () =>{
//     signupUser()
//     .then(res=>res.data)
//     .catch(err=>console.log(err))

// }

import { REMOVE_ROLE, SET_ROLE } from "../actions/actionTypes";

export const setRole = (roleType, roleData) => {
  return {
    type: SET_ROLE,
    payload: {
      roleType,
      roleData,
    },
  };
};

export const removeRole = () => {
  return {
    type: REMOVE_ROLE,
  };
};