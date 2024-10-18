require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyparser = require("body-parser");
const mainRoutes = require("./routes/main");
const adminRoutes = require("./routes/admin");
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
  const testi = new Service({
    title: "2nd test title",
    price: 45,
    description: "2nd test description",
  });
  await testi.save();
  res.status(200).send(testi);
}); */

app.use("/", mainRoutes);
app.use("/admin", adminRoutes);

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).send(message);
});

app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
