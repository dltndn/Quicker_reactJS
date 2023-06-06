import express from "express";

import OrderController from "../Controllers/OrderController";

require("dotenv").config();

const router = express.Router();

router.get("/", OrderController.order)
  
export default router;