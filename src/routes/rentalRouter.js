import { Router } from "express";
import deleteRental, {
  createRental,
  getRentals,
  finalizeRental,
} from "../controller/rentalController.js";
import validateRentalSchema from "../middlewares/validations/validateRentalSchema.js";

const router = Router();

router.get("/rentals", getRentals);
router.post("/rentals", validateRentalSchema, createRental);
router.post("/rentals/:id/return", finalizeRental);
router.delete("/rentals/:id", deleteRental);

export default router;
