import { Router } from "express";
import { verifyJWT } from "../midleware/auth.midleware.js";
import { upload } from "../midleware/multer.mildleware.js";
import { addHotel, deleteHotel, getHotel, updateHotel, uploadFiles ,getAllHotels, getHotelById } from "../controlers/hotel.controller.js";

const router = Router();

router.route("/upload-files").post(verifyJWT, upload.fields([
    {
        name: "images",
    },
]),uploadFiles)

router.route("/add").post(verifyJWT, addHotel)
router.route("/update/:id").patch(verifyJWT, updateHotel)
router.route("/delete/:id").delete(verifyJWT, deleteHotel)
router.route("/gethotel").get(verifyJWT, getHotelById)
router.route("/get/:id").get( getHotel)
router.route("/hotels").get(getAllHotels)

export default router