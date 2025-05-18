import { Router } from "express";
import { verifyJWT } from "../midleware/auth.midleware.js";
import {  addRoom ,updateRoom, getRoom , deleteRoom, getAllRooms, getHotelRooms } from "../controlers/room.controller.js";

const router = Router();

router.route('/add').post(verifyJWT,addRoom)
router.route("/details").get(verifyJWT, getAllRooms)
router.route("/hotel-rooms/:id").get(verifyJWT, getHotelRooms)
router.route("/detail/:id").get(verifyJWT, getRoom)
router.route("/update/:id").patch(verifyJWT, updateRoom)
router.route("/delete/:id").delete(verifyJWT, deleteRoom)

export default router