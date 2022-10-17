import jwt from "jsonwebtoken";

export const login = (req, res) => {
  console.log("Auth hhh");

  const token = jwt.sign({ user: "Avet" }, "hello");

  res.send({ status: "ok", token: token });
};

export const signup = (req, res) => {
  console.log("sign up");
  res.send({ status: "ok" });
};
