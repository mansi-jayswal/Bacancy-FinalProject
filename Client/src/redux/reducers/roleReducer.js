import { REMOVE_ROLE, SET_ROLE } from "../actions/actionTypes";

const initialState = {
  isAuth: false,
  admin: null,
  user: null,
  sub_admin: null,
};

const roleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ROLE: {
      const { roleType, roleData } = action.payload;
      const newState = { ...state, isAuth: true, [roleType]: roleData };
      return newState;
    }
    case REMOVE_ROLE: {
      return {
        isAuth: false,
        admin: null,
        user: null,
        sub_admin: null,
      };
    }
    default: {
      return state;
    }
  }
};

export default  roleReducer ;