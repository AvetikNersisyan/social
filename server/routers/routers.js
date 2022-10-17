import express from "express";
import { login, signup } from "../controllers/authController/auth.js";

const router = express.Router();

router.use((req, res, next) => {
  //   if (true) {
  //     return res.send({ status: "error" });
  //   }
  next();
});

router.post("/login", login);
router.post("/signup", signup);

export default router;
