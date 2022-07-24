import express from "express";
import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";
import categoryRouter from "./routes/categoryRouter.js";
import gameRouter from "./routes/gameRouter.js";
import customerRouter from "./routes/customerRouter.js";

//CONFIGS
dotenv.config();
const app = express();
app.use([cors(), express.json()]);

//ROUTES
app.use(categoryRouter);

app.use(gameRouter);

app.use(customerRouter);

//SERVER
app.listen(process.env.PORT, () =>
  console.log(chalk.bold.blue(`Server listening on port ${process.env.PORT}`))
);
