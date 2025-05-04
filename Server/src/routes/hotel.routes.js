import { Router } from "express";
import { verifyJWT } from "../midleware/auth.midleware.js";
import { upload } from "../midleware/multer.mildleware.js";
import { addHotel, uploadFiles } from "../controlers/hotel.controller.js";

const router = Router();

router.route("/upload-files").post(verifyJWT,upload.fields([
    {
        name:"images",
    },
]),
uploadFiles)

router.route("/add").post(verifyJWT,addHotel)

export default router