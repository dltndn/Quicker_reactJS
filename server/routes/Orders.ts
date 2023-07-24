import express from "express";
import OrderController from "../Controllers/OrderController";
import UserController from "../Controllers/UserController";

const router = express.Router();
// GET /orders
router.get("/", UserController.getRequests);
/**
 * @TODO : REST 규격에 맞는 요청 수정 필요
 */

// POST /orders
router.post("/", OrderController.orderlist)

export default router;