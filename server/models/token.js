import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: false
  },
  words: {
    type: Number,
    required: false
  },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model("Token", TokenSchema);
