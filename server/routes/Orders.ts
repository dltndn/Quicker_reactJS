import express from "express";
import OrderController from "../Controllers/OrderController";
import UserController from "../Controllers/UserController";

const router = express.Router();
// GET /orders
router.get("/", UserController.getRequests);
// POST /orders/detail
router.get("/detail", OrderController.orderlist)

export default router;