import { Router } from "express";
import {
  getCostumers,
  createCostumer,
} from "../controller/costumerController.js";

const router = Router();

router.get("/costumers", getCostumers);
router.post("/costumers", createCostumer);

export default router;
