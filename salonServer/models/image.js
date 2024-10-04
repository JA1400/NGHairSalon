const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  image: String,
  fileId: String,
});

module.exports = mongoose.model("Image", ImageSchema);
