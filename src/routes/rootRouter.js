import express from "express";
import { getLogin, home } from "../controllers/rootController.js";

const rootRouter = express.Router();

rootRouter.route("/").get(home);
rootRouter.route("/login").get(getLogin);

export default rootRouter;
