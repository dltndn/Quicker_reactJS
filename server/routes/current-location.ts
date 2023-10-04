import express from "express";
import { orderController } from "../Controllers";

const router = express.Router();

// GET /current-deliver-location
router.get("/",  orderController.getLocation)
// POST /current-deliver-location
router.post("/", orderController.postLocation);

export = router;