/*import dbConnect from "../../lib/dbConnect";
import Product from "../../models/Product";
*/
export default async function hander(req, res) {
  /*await dbConnect();
  Product.watch().on("change", async (data) => {
    
    console.log("index revalidated");
  });*/

  console.log("req.body= ", req?.body);
  await res.revalidate("/products");
  /* return res.status(200).send("Success!");*/
  return res.status(200).send("Success ... on demand ISR !");
}
