import express from "express";
import ChatController from "../Controllers/ChatController";
import OrderController from "../Controllers/OrderController";

const router = express.Router();

// GET /room
router.get("/", OrderController.getRoomInfo);
/** 
 * @TODO : POST /room/message 테스트 코드 작성 필요
 */
// GET /room/message
router.get("/message", ChatController.getRecentMessageInfo);

export default router