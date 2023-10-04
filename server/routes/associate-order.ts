import express from "express"
import { adminController } from "../Controllers";

const router = express.Router();

router
  .post("/single", adminController.deleteAssociateOrder)
  .post("/multi", adminController.deleteAssociateOrders);

export = router;