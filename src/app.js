import express from "express";
import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";

//CONFIGS
dotenv.config();
const app = express();
app.use([cors(), express.json()]);

//SERVER
app.listen(process.env.PORT, () =>
  console.log(chalk.bgBlue(`Server listening on port ${process.env.PORT}`))
);
