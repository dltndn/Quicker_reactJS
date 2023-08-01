import express from "express";
import UserController from "../Controllers/UserController";

const router = express.Router();

// GET /user/name
router.get("/name", UserController.findUserNameByWalletAddress);

export default router