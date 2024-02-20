const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const logger = require("morgan");
const passport = require("./config/passport");
const errors = require("./utils/response/errors");
const { setRefreshTokenCookie } = require("./services/auth.service");

const app = express();

// LOGGER
if (process.env.NODE_ENV !== "production") app.use(logger("dev"));

// GLOBAL MIDDLEWARE
app.use(helmet());
app.use(cors(require("./config/cors")));
app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

// STATIC FOLDER
app.use(express.static(path.join(__dirname, "public")));

// ROUTES
app.use(require("./routes"));

app.get(
  "/api/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

app.get(
  "/api/auth/google/callback",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    const { refreshToken } = req.user;

    setRefreshTokenCookie(res, refreshToken);

    res.redirect(process.env.CLIENT_URL);
  }
);

// NOT FOUND HANDLER
app.all("*", function (req, res, next) {
  next(errors.routeNotFound());
});

// GLOBAL ERROR HANDLER
app.use(require("./middleware/globalErrorHandler"));

module.exports = app;
