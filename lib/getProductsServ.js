import axios from "axios";
import { data } from "../data";
/* get products server side */
export async function getProductsServ() {
  /*const url = "https://fakestoreapi.com/products";
  const data = await axios.get(url);
  return data.data;*/
  return data;
}

export async function getProductServ(id) {
  /*const url = "https://fakestoreapi.com/products";
  const products = await axios.get(url);
  return products.data.filter((p) => p.id === id);*/
  return data.filter((p) => p.id == id);
}
