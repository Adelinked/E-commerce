import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import productsReducer from "./productsReducer";
import userReducer from "./userReducer";
import appReducer from "./appReducer";

export default combineReducers({
  cart: cartReducer,
  products: productsReducer,
  user: userReducer,
  app: appReducer,
});
