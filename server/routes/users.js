import express from "express";
import userCtrl from "../controllers/user";
import validate from "express-validation";
import validations from "./validation/users";

const router = express.Router();

router
  .route("/")
  /** POST /api/users - Create new user */
  .post(validate(validations.createUser), userCtrl.create);

export default router;
