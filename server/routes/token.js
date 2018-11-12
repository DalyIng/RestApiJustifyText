import express from "express";
import tokenCtrl from "../controllers/token";
import validate from "express-validation";
import validations from "./validation/token";

const router = express.Router();

router
  .route("/")
  /** POST /api/token Get JWT authentication token */
  .post(
    validate(validations.generateToken),
    tokenCtrl.authenticate,
    tokenCtrl.generateToken,
    tokenCtrl.creatToken,
    tokenCtrl.respondJWT
  );

export default router;
