import express from "express";
import ChatController from "../Controllers/ChatController";
import OrderController from "../Controllers/OrderController";

const router = express.Router();

router.get("/", OrderController.getRoomInfo);
/** 
 * @TODO : REST 형식에 맞게 수정 필요
 */
router.post("/message", ChatController.getRecentMessageInfo);

export default router