import express from "express";
import multer from "multer";
import OrderController from "../Controllers/OrderController";

require("dotenv").config();

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// GET /order/image/fail
router.get("/", OrderController.getFailImage);
// POST /order/image/fail
router.post("/", upload.single("image"), OrderController.postFailImage)

export default router;