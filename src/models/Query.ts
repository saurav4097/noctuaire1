import mongoose, { Schema, model, models } from "mongoose";

const querySchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
 message: { type: String, required: true },
});


const Query = models.Query || mongoose.model("Query", querySchema, "query");


export default Query;