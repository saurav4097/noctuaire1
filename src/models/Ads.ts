import mongoose, { Schema, model, models } from "mongoose";
import { Content } from "next/font/google";

const adsSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
link: { type: String, required: true },
});

const Ads = models.Ads || mongoose.model("Ads", adsSchema,"ads");
export default Ads;