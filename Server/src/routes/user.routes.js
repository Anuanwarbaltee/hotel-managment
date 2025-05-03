import { Router } from "express";

import {upload} from "../midleware/multer.mildleware.js"
import { verifyJWT } from "../midleware/auth.midleware.js"
import { registerUser,loginUser,logoutUser,refreshAccessToken ,changePassword,updateUser} from "../controlers/user.controller.js";



const router = Router()

router.route("/register").post(upload.fields(
    [
        {
            name:"avatar",
            maxCount:1
        },
    ]),
    registerUser
)
router.route("/login").post(loginUser)

// Secure Routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/reset-password").post(verifyJWT, changePassword)
router.route("/refresh-token").post(refreshAccessToken)

router.route("/update-user").post(verifyJWT,upload.fields(
    [
        {
            name:"avatar",
            maxCount:1
        },
    ]),
    updateUser
)

export default router