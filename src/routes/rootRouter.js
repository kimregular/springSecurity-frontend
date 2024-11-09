import express from "express";
import {
    getLogin,
    home,
    postLogin,
    getJoin,
    postJoin,
    getAdmin,
} from "../controllers/rootController.js";

const rootRouter = express.Router();

rootRouter.route("/").get(home);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.route("/admin").get(getAdmin);

export default rootRouter;
