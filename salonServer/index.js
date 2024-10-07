require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyparser = require("body-parser");
const mainRoutes = require("./routes/main");
const dbUrl = process.env.DB_URL;
const port = process.env.PORT;

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("Database Connected!!");
  })
  .catch((err) => {
    console.log("Error!");
    console.log(err);
  });

app.use(cors());
app.use(bodyparser.json());

/* app.get("/create", async (req, res) => {
  const testi = new Testimonial({
    name: "Mary",
    email: "Mary@gmail.com",
    message:
      "Sed arcu non odio euismod lacinia at. Tortor at risus viverra adipiscing at in tellus integer. Ante in nibh mauris cursus mattis molestie a iaculis at. Mollis nunc sed id semper risus in hendrerit gravida. Condimentum lacinia quis vel eros donec ac odio tempor. Id donec ultrices tincidunt arcu non sodales neque.",
  });
  await testi.save();
  res.status(200).send(testi);
}); */

app.use("/", mainRoutes);

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).send(message);
});

app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
