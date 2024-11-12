const Image = require("../models/image");

module.exports.saveImage = async (req, res) => {
  console.log(req.file);
  res.status(200).send({ message: "Successfully Received" });
};

module.exports.deleteImage = async (req, res) => {
  const { id } = req.params;
  await Image.findByIdAndDelete(id);
  res.status(200).send({ message: "Successfully Deleted" });
};
