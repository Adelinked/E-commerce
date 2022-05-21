import { SHOW_USER_LOGIN } from "../types";

const initialState = {
  user: [],
  showLogin: false,
  loggedIn: false,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_USER_LOGIN:
      return {
        ...state,
        showLogin: action.payload,
      };
    default:
      return state;
  }
}
