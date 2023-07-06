const mongoose = require("mongoose");

const flowerSchema = mongoose.Schema({
  id: { type: String, required: false },
  commonName: { type: String, required: true },
  botanicalName: { type: String, required: false },
  color: { type: String, required: false },
  url: { type: String, required: false },
  imageUrl: { type: String, required: true },
  group: [{ type: mongoose.Schema.Types.ObjectId, ref: "Flower" }]
});

module.exports = mongoose.model("Flower", flowerSchema);