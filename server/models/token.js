import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: false
  },
  words: {
    type: Number,
    required: false
  }
});

export default mongoose.model("Token", TokenSchema);
