var sequenceGenerator = require("./sequenceGenerator");
var express = require("express");
var router = express.Router();

const Contact = require("../models/contact");

router.get("/", (req, res, next) => {
  Contact.find()
    .populate("group")
    .then((contacts) => {
      res.status(200).json({
        message: "Successfully retrieved contacts.",
        contacts: contacts
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred whilst retrieving contacts from the database.",
        error: error,
      });
    });
});

router.get('/:id', (req, res, next) => {
  Contact.findOne({
    id: req.params.id
  })
    .populate("group")
    .then(contact => {
      res.status(200).json({
        test: "test",
        message: "Successfully retrieved contact.",
        contact: contact
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred whilst retrieving the contact from the database.",
        error: error,
      });
    });
});

router.post("/", (req, res, next) => {
  const maxContactId = sequenceGenerator.nextId("contacts");

  const contact = new Contact({
    id: maxContactId,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    imageUrl: req.body.imageUrl,
    group: req.body.group,
  });
  contact
    .save()
    .then((createdContact) => {
      res.status(201).json({
        message: "Contact added successfully.",
        contact: createdContact,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message:'An error occurred whilst creating the contact.',
        error: err,
      });
    });
});

        
router.put('/:id', (req, res, next) => {
  Contact.findOne({ id: req.params.id })
    .then((contact) => {
      contact.name = req.body.name;
      contact.email = req.body.email;
      contact.phone = req.body.phone;
      contact.imageUrl = req.body.imageUrl;
      contact.group = req.body.group;

      Contact.updateOne({ id: req.params.id }, contact)
        .then((result) => {
          res.status(204).json({
            message: "Contact updated successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred whilst updating the contact.",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(404).json({
        message: "Contact not found.",
        error: { contact: 'Contact not found.' }
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Contact.findOne({ id: req.params.id })
    .then((contact) => {
      Contact.deleteOne({ id: req.params.id })
        .then((result) => {
          res.status(204).json({
            message: "Contact deleted successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred whilst deleting the contact.",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(404).json({
        message: "Contact not found.",
        error: error,
      });
    });
});

module.exports = router;