import express from "express";
import { newsController } from "../controllers/newsController/news.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express();

router.use(verifyToken);

router.get("/news", newsController);

export default router;
