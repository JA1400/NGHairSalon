const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TestimonialSchema = new Schema({
  name: String,
  email: String,
  message: String,
});

module.exports = mongoose.model("Testimonial", TestimonialSchema);
