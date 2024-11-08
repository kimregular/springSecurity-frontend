import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import rootRouter from "./routes/rootRouter.js";

dotenv.config();

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", rootRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}!`));
