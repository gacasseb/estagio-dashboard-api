const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User"); // Make sure this is your Sequelize model

passport.use(
  "signup",
  new LocalStrategy(async (username, password, done) => {
    try {
      const newUser = await User.create({ username, password });
      return done(null, newUser);
    } catch (error) {
      return done(error);
    }
  })
);

passport.use(
  "login",
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ where: { username } });
      if (!user || user.password !== password) {
        return done(null, false, { message: "Invalid username or password" });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findOne({ where: { id } });
  done(null, user);
});

module.exports = passport;
