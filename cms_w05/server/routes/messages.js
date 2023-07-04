const sequenceGenerator = require('./sequenceGenerator');
const Message = require('../models/message');
var express = require('express');
var router = express.Router();


router.get('/', (req, res, next) => {
  Message.find()
    .populate('sender')
      .then(messages => {
        res.status(200).json({
          message: 'Messages fetched successfully',
          messages: messages
        });
      })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
  });

router.post("/", (req, res, next) => {
  const maxMessageId = sequenceGenerator.nextId("messages");

  const message = new Message({
    id: maxMessageId,
    subject: req.body.subject,
    msgText: req.body.msgText,
    sender: req.body.sender,
  });
  message
    .save()
    .then((createdMessage) => {
      res.status(201).json({
        message: "Message added successfully.",
        messageObjs: createdMessage,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred whilst creating the message.",
        error: error,
      });
    });
});

router.put("/:id", (req, res, next) => {
  Message.findOne({ id: req.params.id })
    .then((message) => {
      msg.subject = req.body.subject;
      msg.msgText = req.body.msgText;
      msg.sender = req.body.sender;

      Message.updateOne({ id: req.params.id }, message)
        .then((result) => {
          res.status(204).json({
            message: "Message updated successfully.",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred whilst updating the message.",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(404).json({
        message: "Message not found.",
        error: error,
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Message.findOne({ id: req.params.id })
    .then((message) => {
      Message.deleteOne({ id: req.params.id })
        .then((result) => {
          res.status(204).json({
            message: "Message deleted successfully.",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred whilst deleting the message.",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(404).json({
        message: "Message not found.",
        error: error,
      });
    });
});

module.exports = router; 
