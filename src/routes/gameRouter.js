import { Router } from "express";
import { createGame, getGames } from "../controller/gameController.js";
import validateGameSchema from "../middlewares/validations/validateGameSchema.js";

const router = Router();

router.get("/games", getGames);
router.post("/games", validateGameSchema, createGame);

export default router;
