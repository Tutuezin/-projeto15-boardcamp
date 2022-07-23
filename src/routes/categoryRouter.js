import { Router } from "express";
import {
  createCategory,
  getCategories,
} from "../controller/categoryController.js";
import validateCategoySchema from "../middlewares/validations/validateCategorySchema.js";

const router = Router();

router.get("/categories", getCategories);
router.post("/categories", validateCategoySchema, createCategory);

export default router;
