import express from "express";
import { chatController, orderController } from "../Controllers";

const router = express.Router();

// GET /room
router.get("/", orderController.getRoomInfo);
// GET /room/message
router.get("/message", chatController.getRecentMessage);

export default router