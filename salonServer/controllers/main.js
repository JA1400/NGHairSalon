const Testimonial = require("../models/testimonial");
const Service = require("../models/service");
const Contact = require("../models/contact");
const Image = require("../models/image");
const Inquiry = require("../models/inquiry");

module.exports.getImages = async (req, res) => {
  const image = await Image.find();
  res.status(200).send(image);
};

module.exports.getContactInfo = async (req, res) => {
  const contact = await Contact.findOne();
  res.status(200).send(contact);
};

module.exports.getTestimonials = async (req, res) => {
  const testi = await Testimonial.find();
  res.status(200).send(testi);
};

module.exports.getServices = async (req, res) => {
  const service = await Service.find();
  res.status(200).send(service);
};

module.exports.sendInquiry = async (req, res) => {
  const { name, email, subject, message } = req.body;
  const inquiry = new Inquiry({
    name: name,
    email: email,
    subject: subject,
    message: message,
  });
  await inquiry.save();
  res.status(200).send({ message: "success" });
};
