const mongoose = require("mongoose");

const sequenceSchema = mongoose.Schema({
  maxFlowerId: { type: Number, required: true },
});

module.exports = mongoose.model("Sequence", sequenceSchema);