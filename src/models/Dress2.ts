import mongoose, { Schema, model, models } from "mongoose";

const dress2Schema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  group_name: { type: String, required: true },
  gender:{ type: String , enum: ["male", "female"] },
  number:{ type: Number, required: true }
});

const Dress2 = models.Dress2 || mongoose.model("Dress2", dress2Schema,"dress2");
export default Dress2;