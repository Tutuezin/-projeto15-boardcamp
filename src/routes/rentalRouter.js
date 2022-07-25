import { Router } from "express";
import {
  createRental,
  getRentals,
  finalizeRental,
} from "../controller/rentalController.js";
import validateRentalSchema from "../middlewares/validations/validateRentalSchema.js";

const router = Router();

router.get("/rentals", getRentals);
router.post("/rentals", validateRentalSchema, createRental);
router.post("/rentals/:id/return", finalizeRental);

export default router;
