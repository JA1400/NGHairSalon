const Testimonial = require("../models/testimonial");
const sTestimonial = require("../models/storedTestimonial");

module.exports.getPendingTestimonials = async (req, res) => {
  const testimonials = await Testimonial.find();
  res.status(200).send(testimonials);
};

module.exports.storeTestimonial = async (req, res) => {
  try {
    const { _id, name, email, message } = req.body;
    const testi = new sTestimonial({
      name: name,
      email: email,
      message: message,
    });
    await testi.save();
    await Testimonial.findByIdAndDelete(_id);
    res.status(200).send({ message: "Succesfully Added!", testimonial: testi });
  } catch (e) {
    res.status(500).send({ message: "Error Adding Testimonial" });
  }
};

module.exports.deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    await Testimonial.findByIdAndDelete(id);
    res.status(200).send({ message: "Succesfully Deleted!" });
  } catch (e) {
    res.status(500).send({ message: "Error Deleting Testimonial" });
  }
};

module.exports.deleteSTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    await sTestimonial.findByIdAndDelete(id);
    res.status(200).send({ message: "Succesfully Deleted!" });
  } catch (e) {
    res.status(500).send({ message: "Error Deleting Testimonial" });
  }
};
