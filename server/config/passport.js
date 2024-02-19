const passport = require("passport");
const { Strategy: GoogleStratgy } = require("passport-google-oauth20");
const { v4: uuid } = require("uuid");
const { default: slugify } = require("slugify");
const { generateRefreshToken } = require("../services/auth.service");
const User = require("../models/user.model");
const UserCredentials = require("../models/userCredential.model");

passport.use(
  new GoogleStratgy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      // 1- check if user already exists
      const userExist = await UserCredentials.findOne({
        providerId: profile.id,
      });

      if (userExist) {
        const refreshToken = generateRefreshToken({ userId: userExist.user });
        userExist.tokens.push(refreshToken);
        await userExist.save();

        return done(null, { refreshToken });
      } else {
        const user = await User.create({
          name: profile._json.name,
          email: profile._json.email,
          profileImage: profile._json.picture,
          slug: `${slugify(profile._json.name)}-${uuid()}`,
        });

        const refreshToken = generateRefreshToken({ userId: user._id });

        await UserCredentials.create({
          user: user._id,
          provider: "google",
          providerId: profile.id,
          tokens: [refreshToken],
        });

        return done(null, { refreshToken });
      }
    }
  )
);

module.exports = passport;
