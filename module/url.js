const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema(
  {
    shortid: {
      type: String,
      unique: true,
      required: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visitHistory: [
      {
        timestamp: { type: Number },
      },
    ],
  },
  { timestamps: true }
);
const url = mongoose.model("Url", UrlSchema);
module.exports = url;
