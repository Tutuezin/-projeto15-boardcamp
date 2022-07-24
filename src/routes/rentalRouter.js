import { Router } from "express";
import { createReantal, getRentals } from "../controller/rentalController.js";
import validateRentalSchema from "../middlewares/validations/validateRentalSchema.js";

const router = Router();

router.get("/rentals", getRentals);
router.post("/rentals", validateRentalSchema, createReantal);

export default router;
