import express from "express";

import OrderController from "../Controllers/OrderController";
import OrderFailImage from "./OrderFailImage";
import OrderCompleteImage from "./OrderCompleteImage";

require("dotenv").config();

const router = express.Router();

router.get("/", OrderController.order)
router.post("/", OrderController.request);
router.patch("/", OrderController.updateOrder);

router.use("/image/complete", OrderCompleteImage);
router.use("/image/fail", OrderFailImage);

export default router;