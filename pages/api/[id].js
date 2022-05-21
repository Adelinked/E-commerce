import { data } from "../../data";

export default function handler(req, res) {
  const id = req.query.id;

  res.status(200).json(data.filter((i) => i.id == id));
}
