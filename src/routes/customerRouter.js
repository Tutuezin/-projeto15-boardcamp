import { Router } from "express";
import {
  getCustomers,
  createCustomer,
  getCustomer,
  updateCustomer,
} from "../controller/customerController.js";
import validateCustomerSchema from "../middlewares/validations/validateCustomerSchema.js";

const router = Router();

router.get("/customers", getCustomers);
router.get("/customers/:id", getCustomer);
router.post("/customers", validateCustomerSchema, createCustomer);
router.put("/customers/:id", validateCustomerSchema, updateCustomer);

export default router;
