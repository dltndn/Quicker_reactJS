import express from "express";
import { userController } from "../Controllers";

const router = express.Router();

// POST /register
router.post("/", userController.register);

export = router