const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  phone: String,
  email: String,
  address: String,
});

module.exports = mongoose.model("Contact", ContactSchema);
