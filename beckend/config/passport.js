const Users = require("../models/registration");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "jwtrandonString";
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    console.log(jwt_payload);

    Users.findOne({ id: jwt_payload.id })
      .then((user) => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
          // or you could create a new account
        }
      })
      .catch((err) => {
        console.log('errror' , err);
        return done(err, false);
      });
  }) 
);