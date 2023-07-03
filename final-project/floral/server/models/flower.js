const mongoose = require("mongoose");

const flowerSchema = mongoose.Schema({
  id: { type: String, required: true },
  commonName: { type: String, required: true },
  botanicalName: { type: String, required: true },
  color: { type: String, required: true },
  url: { type: String, required: true },
  imageUrl: { type: String, required: true },
  group: [{ type: mongoose.Schema.Types.ObjectId, ref: "Flower" }]
});

module.exports = mongoose.model("Flower", flowerSchema); 