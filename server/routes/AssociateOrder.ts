import AdminController from "../controllers/AdminController";

const express = require("express");
const router = express.Router();

router
  .post("/single", AdminController.deleteAssociateOrderProcess)
  .post("/multi", AdminController.deleteAssociateOrdersProcess);
export default router;
