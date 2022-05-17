import {
  LOADING_PRODUCTS,
  FETCH_PRODUCTS,
  REMOVE_PRODUCT,
  CLEAR_PRODUCTS,
} from "../types";

export const setProduct = (p, id) => async (dispatch) => {
  dispatch({ type: p, payload: id });
};

export const setCurrProduct = (id) => async (dispatch) => {
  dispatch({ type: "SET_CURR_PRODUCT", payload: id });
};

export const setProducts = (products) => async (dispatch) => {
  dispatch({ type: "SET_PRODUCTS", payload: products });
};

export const setFilter = (filter) => async (dispatch) => {
  dispatch({ type: "SET_FILTER", payload: filter });
};

export const clearFilter = () => async (dispatch) => {
  dispatch({ type: "CLEAR_FILTER" });
};

export const sortProducts = (sort) => async (dispatch) => {
  dispatch({ type: "SORT_PRODUCTS", payload: sort });
};

export const setProductsDisplay = (display) => async (dispatch) => {
  dispatch({ type: "SET_PRODUCTS_DISPLAY", payload: display });
};

export const loadingProducts = () => async (dispatch) => {
  dispatch({ type: "LOADING_PRODUCTS", payload: [] });
};
/*
export const showCartNav = (show) => async (dispatch) => {
  dispatch({ type: "SHOW_CART_NAV", payload: show });
};*/

export const fetchProducts = (p) => async (dispatch) => {
  dispatch(loadingCart());
  //const url = p === 1 ? "http://localhost:3000/api/" : "./api/";
  //const url = "http://localhost:3000/api/products";
  const url = "https://fakestoreapi.com/products";
  const response = await fetch(url);
  const cart = await response.json();

  dispatch({ type: "FETCH_PRODUCTS", payload: products });
};
