import express from "express";
import UserController from "../Controllers/UserController";

const router = express.Router();

/**
 * @TODO : REST 규격에 맞는 요청으로 수정 필요
 */
router.post("/name", UserController.findUserNameByWalletAddress);

export default router