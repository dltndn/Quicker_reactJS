import express from "express"
import { orderController } from "../Controllers";

const router = express.Router();

// GET /average/cost
router.get("/cost", orderController.getAverageCost)

export = router;
