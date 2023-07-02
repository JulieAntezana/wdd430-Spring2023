const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
   id: { type: String, required: true },
   subjectValue: { type: String },
   msgTextValue: { type: String, required: true },
   senderValue: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact'}
});

module.exports = mongoose.model('Message', messageSchema);