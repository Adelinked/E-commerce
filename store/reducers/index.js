import { combineReducers } from "redux";
import questionsReducer from "./questionsReducer";
import cartReducer from "./cartReducer";
import productsReducer from "./productsReducer";

export default combineReducers({
  questions: questionsReducer,
  cart: cartReducer,
  products: productsReducer,
});
