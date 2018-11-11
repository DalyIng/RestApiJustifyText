import jwt from "jsonwebtoken";
import Token from "../models/token";
import config from "../../config/env";

function generateToken(req, res, next) {
  const jwtPayload = {
    id: "uhosuiheiovhzgigrhop"
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
  })
  
  next();
}

function respondJWT(req, res) {
  res.status(200).json({
    jwt: req.token
  });
}

export default { generateToken, creatToken, respondJWT };
