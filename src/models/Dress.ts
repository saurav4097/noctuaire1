import mongoose, { Schema, model, models } from "mongoose";

const dressSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  group_name: { type: String, required: true },
  gender:{ type: String , enum: ["male", "female"] },
  number:{ type: Number, required: true }
});

const Dress = models.Dress || mongoose.model("Dress", dressSchema,"dress");
export default Dress;