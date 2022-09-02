import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    title: { type: String, required: true },
    postImg: { type: String },
    stripApiId: { type: String },
    price: { type: Number },
    description: { type: String },
    category: { type: String },
    image: { type: String },
    imageOrig: { type: String },
    rating: { type: Object },
    freeShipping: { type: Boolean },
    company: { type: String },
  },
  { timestamps: true }
);

global.Product = global.Product || mongoose.model("Product", ProductSchema);

export default global.Product;
