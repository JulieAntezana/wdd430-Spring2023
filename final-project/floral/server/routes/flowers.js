var sequenceGenerator = require("./sequenceGenerator");
var express = require("express");
var router = express.Router();

const Flower = require("../models/flower");

router.get("/", (req, res, next) => {
  Flower.find()
    .populate("group")
    .then((flowers) => {
      res.status(200).json({
        message: "Successfully retrieved flowers.",
        flowers: flowers
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred whilst retrieving flowers from the database.",
        error: error,
      });
    });
});

router.get('/:id', (req, res, next) => {
  Flower.findOne({
    "id": req.params.id
  })
    .populate("group")
    .then(flower => {
      res.status(200).json({
        message: "Successfully retrieved flower.",
        flower: flower
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred whilst retrieving the flower from the database.",
        error: error,
      });
    });
});

router.post("/", (req, res, next) => {
  const sequenceGen = new sequenceGenerator(res);
  const maxFlowerId = sequenceGen.nextId("flowers");

  const flower = new Flower({
    id: maxFlowerId,
    commonName: req.body.commonName,
    botanicalName: req.body.botanicalName,
    color: req.body.color,
    url: req.body.url,
    imageUrl: req.body.imageUrl,
    group: req.body.group,
  });
  flower
    .save()
    .then((createdFlower) => {
      res.status(201).json({
        message: "Flower added successfully.",
        flower: createdFlower,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message:'An error occurred whilst creating the flower.',
        error: err,
      });
    });
});

router.put("/:id", (req, res, next) => {
  Flower.findOne({ id: req.params.id })
    .then((flower) => {
      flower.commonName = req.body.commonName;
      flower.botanicalName = req.body.botanicalName;
      flower.color = req.body.color;
      flower.url = req.body.url;
      flower.imageUrl = req.body.imageUrl;
      flower.group = req.body.group;

      Flower.updateOne({ id: req.params.id }, flower)
        .then((result) => {
          res.status(204).json({
            message: "Flower updated successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred whilst updating the flower.",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(404).json({
        message: "Flower not found.",
        error: { flower: 'Flower not found.' }
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Flower.findOne({ id: req.params.id })
    .then((flower) => {
      Flower.deleteOne({ id: req.params.id })
        .then((result) => {
          res.status(204).json({
            message: "Flower deleted successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred whilst deleting the flower.",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(404).json({
        message: "Flower not found.",
        error: error,
      });
    });
});

module.exports = router;