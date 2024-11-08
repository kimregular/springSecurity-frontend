import express from "express";
import { getLogin, home, postLogin } from "../controllers/rootController.js";

const rootRouter = express.Router();

rootRouter.route("/").get(home);
rootRouter.route("/login").get(getLogin).post(postLogin);

export default rootRouter;
