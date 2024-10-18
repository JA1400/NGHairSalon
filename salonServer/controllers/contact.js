const Contact = require("../models/contact");

module.exports.updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { phone, email, address } = req.body;
    await Contact.findByIdAndUpdate(id, { phone, email, address });
    res.status(200).send({ message: "Contact info updated!" });
  } catch (e) {
    res.status(500).send({ message: "Error updating contact info!" });
  }
};
