import express, { NextFunction, Request, Response } from "express";
import multer from "multer";

import { findImage, postImage } from "../service/Order";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

// GET /order/image/complete
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = req.query;
    const image = findImage(query);
    res.send(image);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST /order/image/complete
router.post("/", upload.single("uploadImage"), async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const documentFile = (req as MulterRequest).file;
      await postImage(body, documentFile);
      res.send({ msg: "done" });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

export interface MulterRequest extends Request {
  file: any;
}

export default router;