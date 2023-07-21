import express from "express"
import AdminController from "../Controllers/AdminController";

const router = express.Router();

router
  .post("/single", AdminController.deleteAssociateOrderProcess)
  .post("/multi", AdminController.deleteAssociateOrdersProcess);

export default router;
