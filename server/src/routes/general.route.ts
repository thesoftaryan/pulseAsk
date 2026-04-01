import { Router } from "express";
import { uploadImageController } from "../controllers/general.controller";

import multer from "multer";

const router = Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: Number(process.env.FILE_SIZE) || 5*1024*1024,
    }
});

router.post("/upload/image", upload.single("image"), uploadImageController);

export default router;