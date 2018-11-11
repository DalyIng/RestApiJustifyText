import express from "express";
import justifyCtrl from "../controllers/justify";
import auth from "../../config/jwt";
import validate from "express-validation";
import validations from "./validation/justify";

const router = express.Router();

router
  .route("/")
  /** Before justifing text we test validation, then test the validity of token and see that this token hasn't formatted more than 80000 words  */
  .post(
    validate(validations.justifyText),
    auth,
    justifyCtrl.limit,
    justifyCtrl.justify
  );

export default router;
