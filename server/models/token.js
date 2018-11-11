import mongoose from "mongoose";

/** Token Model */

const TokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: false
  },
  words: {
    type: Number,
    required: false,
    default: 0
  },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model("Token", TokenSchema);
