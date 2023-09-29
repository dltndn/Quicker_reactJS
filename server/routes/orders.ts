import express from "express";
import { orderController, userController } from "../Controllers";

const router = express.Router();
// GET /orders
router.get("/", userController.getRequests);
// GET /orders/detail
router.get("/detail", orderController.orderlist)

export = router;