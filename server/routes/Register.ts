import express from "express";
import UserController from "../Controllers/UserController";

const router = express.Router();

// POST /register
router.post("/", UserController.register);

export default router