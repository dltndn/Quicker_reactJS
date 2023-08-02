import express, { Request } from "express";
import multer from "multer";

import OrderController from "../Controllers/OrderController";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

// GET /order/image/complete
router.get("/", OrderController.getImage);

// POST /order/image/complete
router.post("/", upload.single("uploadImage"), OrderController.postImage);

export interface MulterRequest extends Request {
  file: any;
}

export default router;