import { Router } from "express";
import { addBooking, cancelBooking, getBookings, getOneBooking, updateBooking } from "../controller/flightBookingController";

const router = Router()

router.get('', getBookings)
router.post('/flights', addBooking)
router.get('/:id', getOneBooking)
router.put('/:id', updateBooking)
router.delete('/:id', cancelBooking)
export default router