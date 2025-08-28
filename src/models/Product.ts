import mongoose, { Schema, model, models } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
 gender: { type: String, required: true },
 description: { type: String, required: true },
   aff_url: { type: String, required: true },
  dress_code: { type: String, required: true },
  group_name: { type: String, required: true },
  
});


const Product = models.Product || mongoose.model("Product", productSchema, "product");


export default Product;