import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const { token } = req.body;
  const tokenHeaders = req.headers["authorization"];
  const tokenBearer = tokenHeaders && tokenHeaders.split(" ")[1];

  const singleToken = tokenBearer || token;

  if (!singleToken) {
    return res.status(403).send("Token is required!");
  }

  try {
    const decoded = jwt.verify(singleToken, "hello");
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).send("Token is invalid");
  }
};
