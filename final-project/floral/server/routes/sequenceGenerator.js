var Sequence = require("../models/sequence");

var maxFlowerId;
var sequenceId = null;

function SequenceGenerator(res) {
  Sequence.findOne()
    .exec()
    .then((sequence) => {
      sequenceId = sequence._id;
      maxFlowerId = sequence.maxFlowerId;
    })
    .catch((error) => {
      return res.status(500).json({
        title: "An error occurred",
        error: error,
      });
    });
}
SequenceGenerator.prototype.nextId =  function (collectionType) {
  var updateObject = {};
  var nextId;
  switch (collectionType) {
    case "flowers":
      maxFlowerId++;
      updateObject = { maxFlowerId: maxFlowerId };
      nextId = maxFlowerId;
      break;
    default:
      return -1;
  }
  Sequence.updateOne({ _id: sequenceId }, { $set: updateObject })
  .then(result => console.log(result))
  .catch((err) => {
        console.log("nextId error = ", err);
        return null;
  });
  return nextId;
};
module.exports = SequenceGenerator;

