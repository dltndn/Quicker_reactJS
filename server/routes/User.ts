import express from "express";
import UserController from "../Controllers/UserController";

const router = express.Router();

// GET /user/name
router.get("/name", UserController.findUserNameByWalletAddress);
// GET /user/image/id
router.get('/image/id', UserController.getUserImageId)
// POST /user/image/id
router.put('/image/id', UserController.putUserImageId)

export default router