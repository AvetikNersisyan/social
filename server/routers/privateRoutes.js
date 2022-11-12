import express from "express";
import {
  getFeedController,
  getNewsController,
  publishNews,
} from "../controllers/newsController/news.js";
import { getUser } from "../controllers/userController/user.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import newsRouter from "./news/news.js";
import userRouter from "./user/user.js";

const router = express();

router.use(verifyToken);

router.use("/news", newsRouter);
router.use("/user", userRouter);

export default router;
