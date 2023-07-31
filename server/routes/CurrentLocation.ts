import express from "express";
import OrderController from "../Controllers/OrderController";

const router = express.Router();

// GET /current-deliver-location
router.get("/",  OrderController.getLocation)
// POST /current-deliver-location
router.post("/", OrderController.postLocation);

export default router;