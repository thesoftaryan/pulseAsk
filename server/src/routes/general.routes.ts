import { Router } from "express";
import { uploadImageController } from "../controllers/general.controller";

import multer from "multer";

const router = Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: Number(process.env.FILE_SIZE),
    }
});

router.post("/upload/image", upload.single("image"), uploadImageController);

export default router;