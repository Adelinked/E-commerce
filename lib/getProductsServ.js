import axios from "axios";
import { data } from "../data";
import { DATA_SOURCE } from "../variables";
/*import dbConnect from "./dbConnect";
import Product from "../models/Product";*/
/* get products server side */
export async function getProductsServ() {
  /*const url = "https://fakestoreapi.com/products";
  const data = await axios.get(url);
  return data.data;*/
  /*await dbConnect();
  switch (method) {
    case "GET":
      try {
        const result = await Product.find({});
        res.status(200).json({ success: true, data: result });
      } catch (e) {
        res.status(400).json({ success: false });
      }
  }
  console.log(result);*/
  return data;
}

export async function getProductServ(id) {
  /*const url = "https://fakestoreapi.com/products";
  const products = await axios.get(url);
  return products.data.filter((p) => p.id === id);*/
  return data.filter((p) => p.id == id);
}
