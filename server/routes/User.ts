import express from "express";
import UserController from "../Controllers/UserController";

const router = express.Router();

router.post("/name", UserController.getUserNameUseByWalletAddress);

export default router