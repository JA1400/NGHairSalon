const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 3000;
const Contact = require("./models/contact");
const Testimonial = require("./models/testimonial");
const Service = require("./models/service");
const Image = require("./models/image");
const Inquiry = require("./models/inquiry");
const cors = require("cors");
const bodyparser = require("body-parser");

mongoose
  .connect(
    "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.1"
  )
  .then(() => {
    console.log("Database Connected!!");
  })
  .catch((err) => {
    console.log("Error!");
    console.log(err);
  });
app.use(cors());
app.use(bodyparser.json());

app.get("/create", async (req, res) => {
  const testi = new Testimonial({
    name: "Mary",
    email: "Mary@gmail.com",
    message:
      "Sed arcu non odio euismod lacinia at. Tortor at risus viverra adipiscing at in tellus integer. Ante in nibh mauris cursus mattis molestie a iaculis at. Mollis nunc sed id semper risus in hendrerit gravida. Condimentum lacinia quis vel eros donec ac odio tempor. Id donec ultrices tincidunt arcu non sodales neque.",
  });
  await testi.save();
  res.status(200).send(testi);
});

app.get("/image", async (req, res) => {
  const image = await Image.find();
  res.status(200).send(image);
});

app.get("/contact", async (req, res) => {
  const contact = await Contact.findOne();
  res.status(200).send(contact);
});

app.get("/storedtestimonial", async (req, res) => {
  const testi = await Testimonial.find();
  res.status(200).send(testi);
});

app.get("/service", async (req, res) => {
  const service = await Service.find();
  res.status(200).send(service);
});

app.post("/inquiry", async (req, res) => {
  const { name, email, subject, message } = req.body;
  const inquiry = new Inquiry({
    name: name,
    email: email,
    subject: subject,
    message: message,
  });
  await inquiry.save();
  res.status(200).send({ message: "success" });
});

app.listen(PORT, () => {
  console.log("Serving on port 3000");
});
