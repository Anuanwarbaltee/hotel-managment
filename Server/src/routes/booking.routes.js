import { Router } from "express";
import { createBooking , getHotelBookings , getAllBookings , updateBooking , deleteBooking } from "../controlers/booking.controller.js";
import { verifyJWT } from "../midleware/auth.midleware.js";

const router = Router()

router.route('/add').post(verifyJWT, createBooking)
router.route('/:id').patch(verifyJWT, updateBooking)
router.route('/:id').get(verifyJWT, getHotelBookings)
router.route('/').get(verifyJWT, getAllBookings)
router.route('/:id').delete(verifyJWT, getAllBookings)


export default router