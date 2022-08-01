import {
  LOADING_PRODUCTS,
  FETCH_PRODUCTS,
  SET_PRODUCTS,
  REMOVE_PRODUCT,
  CLEAR_PRODUCTS,
  SET_CURR_PRODUCT,
  SORT_PRODUCTS,
  SET_PRODUCTS_DISPLAY,
  SET_FILTER,
  CLEAR_FILTER,
} from "../types";

const initialState = {
  loading: false,
  products: [],
  filtredProducts: [],
  show: false,
  current: "",
  display: "0",
  sort: "0",
  filter: { title: "", price: 0, category: "", freeShipping: false },
};
export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_PRODUCTS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PRODUCTS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };

    case SET_PRODUCTS:
      const initSort = state.sort;
      let initProducts = action.payload;
      switch (initSort) {
        case "0" /* A - Z */:
          return {
            ...state,
            products: initProducts /*.sort((a, b) => {
              return a.title.localeCompare(b.title);
            }),*/,
          };
        case "1" /* Z - A */:
          return {
            ...state,
            products: initProducts.sort((a, b) => {
              return b.title.localeCompare(a.title);
            }),
          };
        case "2" /* LOWEST PRICE*/:
          return {
            ...state,
            products: initProducts.sort((a, b) => {
              return a.price - b.price;
            }),
          };
        case "3" /* HIGHEST PRICE*/:
          return {
            ...state,
            products: initProducts.sort((a, b) => {
              return b.price - a.price;
            }),
          };
      }

    case SORT_PRODUCTS:
      const sort = action.payload;
      let newProducts = [...state.products];
      switch (sort) {
        case "0" /* A - Z */:
          return {
            ...state,
            sort: sort,
            products: newProducts.sort((a, b) => {
              return a.title.localeCompare(b.title);
            }),
          };
        case "1" /* Z - A */:
          return {
            ...state,
            sort: sort,
            products: newProducts.sort((a, b) => {
              return b.title.localeCompare(a.title);
            }),
          };
        case "2" /* LOWEST PRICE*/:
          return {
            ...state,
            sort: sort,
            products: newProducts.sort((a, b) => {
              return a.price - b.price;
            }),
          };
        case "3" /* HIGHEST PRICE*/:
          return {
            ...state,
            sort: sort,
            products: newProducts.sort((a, b) => {
              return b.price - a.price;
            }),
          };
      }

    case SET_PRODUCTS_DISPLAY:
      return { ...state, display: action.payload };

    case SET_FILTER /* moved the filter logic to apply it locally */:
      /*let newFiltredProd = [...state.products];
      const { title, category, price } = action.payload;
      if (title) {
        newFiltredProd = newFiltredProd.filter((i) =>
          i.title.toLowerCase().includes(title.toLowerCase())
        );
      }
      if (category && category.length > 0) {
        newFiltredProd = newFiltredProd.filter((i) => i.category === category);
      }
      if (price > 0) {
        newFiltredProd = newFiltredProd.filter((i) => i.price <= price);
      }*/
      return {
        ...state,
        filter: action.payload,
        //filtredProducts: newFiltredProd,
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtredProducts: state.products,
        filter: { title: "", price: 0, category: "", freeShipping: false },
      };
    case REMOVE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((i) => i.id !== action.payload),
      };

    case CLEAR_PRODUCTS:
      return {
        ...state,
        products: [],
      };

    case SET_CURR_PRODUCT:
      return {
        ...state,
        current: action.payload,
      };

    default:
      return state;
  }
}
