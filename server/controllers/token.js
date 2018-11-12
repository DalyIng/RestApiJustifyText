import jwt from "jsonwebtoken";
import Token from "../models/token";
import User from "../models/user";
import config from "../../config/env";

/**Authenticate, Generate token with jsonwebtoken, create that token in our DB and return the token */

function authenticate(req, res, next) {
  User.findOne({
    email: req.body.email
  })
    .exec()
    .then(
      user => {
        if (!user) return next();
        user.comparePassword(req.body.password, (e, isMatch) => {
          if (e) return next(e);
          if (isMatch) {
            req.user = user;
            next();
          } else {
            return next();
          }
        });
      },
      e => next(e)
    );
}

function generateToken(req, res, next) {
  if (!req.user) return next();

  const jwtPayload = {
    id: req.user._id
  };
  const jwtData = {
    expiresIn: config.jwtDuration
  };
  const secret = config.jwtSecret;
  req.token = jwt.sign(jwtPayload, secret, jwtData);

  next();
}

function creatToken(req, res, next) {
  Token.create({
    token: req.token
  });

  next();
}

function respondJWT(req, res) {
  if (!req.user) {
    res.status(401).json({
      error: "Unauthorized"
    });
  } else {
    res.status(200).json({
      jwt: req.token
    });
  }
}

export default { authenticate, generateToken, creatToken, respondJWT };
