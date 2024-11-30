const router = require("express").Router();
const User = require("../models/user");
const passport = require("passport");
const utils = require("../lib/utils");

router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.status(200).send({ message: "Success" });
  }
);

router.post("/login", function (req, res, next) {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .send({ success: false, message: "User Not Found!" });
      }

      const isValid = utils.validPassword(
        req.body.password,
        user.hash,
        user.salt
      );

      if (!isValid) {
        return res.status(401).json({
          success: false,
          message: "Password and Email Do Not Match!",
        });
      }

      const tokenObject = utils.issueJWT(user);

      return res.status(200).send({
        success: true,
        token: tokenObject.token,
        expiresIn: tokenObject.expires,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send({ message: "Error Occourred!" });
    });
});

router.post("/register", function (req, res, next) {
  const saltHash = utils.genPassword(req.body.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
    email: req.body.email,
    hash: hash,
    salt: salt,
  });

  newUser
    .save()
    .then((user) => {
      const jwt = utils.issueJWT(user);
      res.status(200).send({
        success: true,
        user: user,
        token: jwt.token,
        expiresIn: jwt.expires,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({ error: err });
    });
});

module.exports = router;
