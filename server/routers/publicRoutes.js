import express from "express";
import { login, signup } from "../controllers/authController/auth.js";

const router = express.Router();

router.use((req, res, next) => {
  const { username, password } = req.body;

  if (!(username && password !== undefined)) {
    return res.send({ message: "Username and password are required" });
  }
  next();
});

router.post("/login", login);
router.post("/signup", signup);

export default router;
