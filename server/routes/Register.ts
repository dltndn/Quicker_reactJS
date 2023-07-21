import express from "express";
import UserController from "../Controllers/UserController";

const router = express.Router();

router.post("/", UserController.register);

export default router