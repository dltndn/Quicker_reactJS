import express, { Request, Response } from "express";
import KlaytnCaver from "../klaytnApi/KlaytnCaver";

const router = express.Router();

// 클레이튼 api 연결
router.post("/getAllowance", KlaytnCaver.getAllowance)
router.post("/getOrderList", KlaytnCaver.getOrderList)
router.post("/getOrdersForLatest", KlaytnCaver.getOrdersForLatest)
router.get("/getCommissionRate", KlaytnCaver.getCommissionRate)
router.post("/getOrder", KlaytnCaver.getOrder)
router.post("/getOrders", KlaytnCaver.getOrders)
router.post("/getQkrwBalance", KlaytnCaver.getQkrwBal)
router.post("/getOrdersForState", KlaytnCaver.getOrdersForState)
router.get("/getOwner", KlaytnCaver.getOwner)
router.post("/getStakingInfo", KlaytnCaver.getStakingInfo)
router.post("/getQtokenAllowance", KlaytnCaver.getQtokenAllowance)

export default router;