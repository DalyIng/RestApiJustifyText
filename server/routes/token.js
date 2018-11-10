import express from "express";
import tokenCtrl from "../controllers/token";

const router = express.Router();

router
  .route("/")
  /** POST /api/auth/token Get JWT authentication token */
  .post(tokenCtrl.generateToken, tokenCtrl.creatToken, tokenCtrl.respondJWT);

export default router;
