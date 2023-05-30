import { Schema, model } from "mongoose";

const User = new Schema({
  login: { type: String, unique: true, required: true },
  password: { type: String, unique: false, required: true },
  fullName: { type: String, unique: false, required: true },
});

export default model("User", User);
