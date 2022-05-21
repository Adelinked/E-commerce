import { LOADING_APP } from "../types";

const initialState = {
  loading: false,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_APP:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}
