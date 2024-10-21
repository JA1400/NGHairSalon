const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StoredTestimonialSchema = new Schema({
  name: String,
  email: String,
  message: String,
});

module.exports = mongoose.model("StoredTestimonial", StoredTestimonialSchema);