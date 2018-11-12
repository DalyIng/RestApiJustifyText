import express from "express";
import justifyRoutes from "./justify";
import tokenRoutes from "./token";
import userRoutes from './users';

const router = express.Router();

router.use('/users', userRoutes);
router.use("/justify", justifyRoutes);
router.use("/token", tokenRoutes);

export default router;
