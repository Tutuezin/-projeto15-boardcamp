import { Router } from "express";
import {
  getCustomers,
  createCustomer,
} from "../controller/customerController.js";
import validateCustomerSchema from "../middlewares/validations/validateCustomerSchema.js";

const router = Router();

router.get("/customers", getCustomers);
router.post("/customers", validateCustomerSchema, createCustomer);

export default router;
