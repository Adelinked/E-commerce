import { INC_ITEM, DEC_ITEM, REMOVE_ITEM, FETCH_ITEMS } from "../types";

export const addProduct = (product) => async (dispatch) => {
  dispatch({ type: "ADD_PRODUCT_CART", payload: product });
};

export const setCart = (p, id) => async (dispatch) => {
  dispatch({ type: p, payload: id });
};

export const setAllCart = (cart) => async (dispatch) => {
  dispatch({ type: "SET_CART", payload: cart });
};

export const loadingCart = () => async (dispatch) => {
  dispatch({ type: "LOADING_CART", payload: [] });
};

export const showCartNav = (show) => async (dispatch) => {
  dispatch({ type: "SHOW_CART_NAV", payload: show });
};

export const fetchItems = (p) => async (dispatch) => {
  dispatch(loadingCart());
  const url = p === 1 ? "http://localhost:3000/api/" : "./api/";
  const response = await fetch(url);
  const cart = await response.json();

  dispatch({ type: "FETCH_ITEMS", payload: cart });
};
