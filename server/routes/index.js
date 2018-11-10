import express from "express";
import justifyRoutes from "./justify";
import tokenRoutes from "./token";

const router = express.Router();

router.use("/justify", justifyRoutes);
router.use("/token", tokenRoutes);

export default router;
