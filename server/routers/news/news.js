import express from "express";
import { likePost } from "../../controllers/likeController/likeController.js";
import {
  getFeedController,
  getNewsController,
  publishNews,
  updatePost,
} from "../../controllers/newsController/news.js";
import { verifyPostLike } from "../../middlewares/verifyPostLIke.js";

const newsRouter = express();

newsRouter.get("/feed", getFeedController);
newsRouter.get("/", getNewsController);

newsRouter.post("/", publishNews);

newsRouter.put("/:id", updatePost);
newsRouter.post("/:id", likePost);

export default newsRouter;
