import {
  INC_ITEM,
  DEC_ITEM,
  REMOVE_ITEM,
  FETCH_ITEMS,
  LOADING_CART,
  CLEAR_CART,
  SHOW_CART_NAV,
  ADD_PRODUCT_CART,
  SET_CART,
} from "../types";

const initialState = {
  loading: false,
  cart: [],
  show: false,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT_CART:
      let newCart = [...state.cart];
      const item = action.payload;
      const i = newCart.findIndex((_item) => _item.id === item.id);
      if (i > -1) newCart[i].amount += item.amount;
      else newCart.push(item);
      return {
        ...state,
        cart: newCart,
      };
    case LOADING_CART:
      return {
        ...state,
        loading: true,
      };

    case SET_CART:
      return {
        ...state,
        loading: false,
        cart: action.payload,
      };

    case FETCH_ITEMS:
      return {
        ...state,
        loading: false,
        cart: action.payload,
      };
    case INC_ITEM:
      return {
        ...state,
        cart: state.cart.map((i) => {
          if (i.id === action.payload) {
            return { ...i, amount: i.amount + 1 };
          } else {
            return { ...i };
          }
        }),
      };
    case DEC_ITEM:
      return {
        ...state,
        cart: state.cart
          .map((i) => {
            if (i.id === action.payload) {
              return { ...i, amount: i.amount === 0 ? 0 : i.amount - 1 };
            } else return { ...i };
          })
          .filter((i) => i.amount !== 0),
      };
    case REMOVE_ITEM:
      return {
        ...state,
        cart: state.cart.filter((i) => i.id !== action.payload),
      };

    case CLEAR_CART:
      return {
        ...state,
        cart: [],
      };
    case SHOW_CART_NAV:
      return {
        ...state,
        show: action.payload,
      };
    default:
      return state;
  }
}
