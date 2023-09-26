import express from "express";

import OrderController from "../Controllers/OrderController";
import OrderFailImage from "./OrderFailImage";
import OrderCompleteImage from "./OrderCompleteImage";

require("dotenv").config();

const router = express.Router();

// 테스트 완료
// GET /order
router.get("/", OrderController.order)
// POST /order
router.post("/", OrderController.request);

router.use("/image/fail", OrderFailImage);
router.use("/image/complete", OrderCompleteImage);

// 테스트 필요
// PATCH /order
router.patch("/", OrderController.updateOrder);

export default router;