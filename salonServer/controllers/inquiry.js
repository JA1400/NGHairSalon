const Inquiry = require("../models/inquiry");

module.exports.getInquiries = async (req, res) => {
  const inquiries = await Inquiry.find();
  res.status(200).send(inquiries);
};

module.exports.deleteInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    await Inquiry.findByIdAndDelete(id);
    res.status(200).send({ message: "Inquiry deleted!" });
  } catch (e) {
    res.status(500).send({ message: "Error deleting inquiry!" });
  }
};
