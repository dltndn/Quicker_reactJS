import express from "express"
import OrderController from "../Controllers/OrderController";

const router = express.Router();

// GET /average/cost
router.get("/cost", OrderController.getAverageCost)

export default router;
