require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const mainRoutes = require("./routes/main");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/users");
const dbUrl = process.env.DB_URL;
const port = process.env.PORT;
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const path = require("path");

require("./config/passport")(passport);
require("./models/user");
/* "mongodb://localhost:27017" */
mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("Database Connected!!");
  })
  .catch((err) => {
    console.log("Error!");
    console.log(err);
  });

app.use(passport.initialize());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(mongoSanitize());
app.use((req, res, next) => {
  // Sanitize all request body fields
  for (const key in req.body) {
    req.body[key] = xss(req.body[key]);
  }

  next();
});

app.use(cookieParser());

/* app.get("/create", async (req, res) => { */
/*   const testi = new Inquiry({
    name: "Test",
    email: "test@test",
    message: "test",
  });
  await testi.save(); */
/*   const testi = new Testimonial({
    name: "Agatha",
    email: "agathe@gmail.com",
    message: "This is a pending testimonials",
  });

  await testi.save();
  res.status(200).send(testi);
}); */

/* app.post("/uploadImage", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.status(200).send({ message: "Successfully received" });
});
 */

/* 
app.use(express.static(path.join(__dirname, "/frontEnd/hair-salon")));
 */

/* Change route names */

app.use("/get-data/", mainRoutes);
app.use("/get-data/admin", adminRoutes);
app.use("/get-data/admin", userRoutes);

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).send(message);
});

/* app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontEnd/hair-salon/index.html"));
}); */

app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
