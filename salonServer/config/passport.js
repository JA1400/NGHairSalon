const fs = require("fs");
const path = require("path");
const User = require("../models/user");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const pathToKey = "/etc/secrets/id_rsa_pub.pem";
/* if (process.env.NODE_ENV !== "production") {
  console.log(__dirname, "..", "id_rsa_pub.pem");
  pathToKey = path.join(__dirname, "..", "id_rsa_pub.pem");
} else {
  pathToKey = "/etc/secrets/id_rsa_pub.pem";
} */
const PUB_KEY = "";
try {
  PUB_KEY = fs.readFileSync(pathToKey, "utf8");
} catch {
  console.log('Error Finding Key');
}

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
};

const strategy = new JwtStrategy(options, async (payload, done) => {
  // We will assign the `sub` property on the JWT to the database ID of user
  await User.findOne({ _id: payload.sub })
    .then((user) => {
      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    })
    .catch((err) => {
      return done(err, null);
    });
});

module.exports = (passport) => {
  passport.use(strategy);
};
