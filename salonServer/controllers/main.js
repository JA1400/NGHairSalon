const sTestimonial = require("../models/storedTestimonial");
const Service = require("../models/service");
const Contact = require("../models/contact");
const Image = require("../models/image");
const Inquiry = require("../models/inquiry");
const nodemailer = require("nodemailer");
const path = require("path");
const ejs = require("ejs");

require("dotenv").config();

module.exports.getImages = async (req, res) => {
  const image = await Image.find();
  res.status(200).send(image);
};

module.exports.getContactInfo = async (req, res) => {
  const contact = await Contact.findOne();
  res.status(200).send(contact);
};

module.exports.getTestimonials = async (req, res) => {
  const testi = await sTestimonial.find();
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

module.exports.postInquiry = async (req, res) => {
  const { name, email, subject, message } = req.body;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: `${process.env.EMAIL}`,
      pass: `${process.env.PASSKEY}`,
    },
  });
  const data = await ejs.renderFile(
    path.join(__dirname, "../", "views", "email", "templateOne.ejs"),
    { name, message }
  );
  const info = await transporter.sendMail({
    from: `"${process.env.SENDERNAME}" <${process.env.EMAIL}>`, // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    text: "", // plain text body
    html: data, // html body
  });
  const dataTwo = await ejs.renderFile(
    path.join(__dirname, "../", "views", "email", "templateTwo.ejs"),
    { name, subject, email, message }
  );
  const infoTwo = await transporter
    .sendMail({
      from: `"${name}" <${process.env.EMAIL}>`, // sender address
      to: `${process.env.EMAIL}`, // list of receivers
      subject: subject, // Subject line
      text: "", // plain text body
      html: dataTwo, // html body
    })
    .catch(console.error);

  const inquiry = new Inquiry({
    name: name,
    email: email,
    subject: subject,
    message: message,
  });
  await inquiry.save();
  res.status(200).send({message: 'success'});
};
