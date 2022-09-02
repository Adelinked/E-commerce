import dbConnect from "../../../lib/dbConnect";
import Product from "../../../models/Product";

export default async function handler(req, res) {
  await dbConnect();
  switch (method) {
    case "GET":
      try {
        const result = await Product.find({});
        res.status(200).json({ success: true, data: result });
      } catch (e) {
        res.status(400).json({ success: false });
      }
  }
}
