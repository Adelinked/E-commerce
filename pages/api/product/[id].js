//import { data } from "../../../data";
import axios from "axios";
export default async function handler(req, res) {
  const { id } = req.query;
  console.log(id);
  try {
    res = await axios.get(`https://fakestoreapi.com/products/${id}`);
    const { data } = res;
    console.log(data.data);
    res.status(200).json(data.data);
  } catch (error) {}
}
