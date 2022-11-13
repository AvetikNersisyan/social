import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { conn } from "../../index.js";
import { SALT_ROUNDS } from "../../routers/utils.js";

export const login = (req, res) => {
  const { username, password } = req.body;

  const sql = `SELECT ID, email, password, name, surname FROM users WHERE email="${username}"`;

  conn.query(sql, async (err, result) => {
    console.log(err, "err");
    if (err) {
      return res.sendStatus(500);
    }

    if (result.length) {
      const isMatch = await bcrypt.compare(password, result[0].password);

      const { email, name, surname, ID: id, username } = result[0]
      // const id = result[0].ID;
      if (isMatch) {
        const token = jwt.sign({ username, id, name, surname, email }, "hello");

        return res.status(200).send({ success: isMatch, token: token });
      } else {
        return res.send({
          success: false,
          message: "Incorrect email/password",
        });
      }
    } else {
      return res.send({ success: false, message: "No user found" });
    }
  });
};

export const signup = (req, res) => {
  const { username, password, name, surname } = req.body;

  if (!(username && password)) {
    return res
      .status(400)
      .send({ message: "Password and username are required" });
  }

  const firstName = name ? `\'${name}\'` : null;
  const lastName = surname ? `\'${surname}\'` : null;

  const salt = bcrypt.genSaltSync(SALT_ROUNDS);
  try {
    const hashed = bcrypt.hashSync(password, salt);
    const sql = `INSERT INTO  users (email, password, name, surname) VALUES("${username}", "${hashed}", ${firstName}, ${lastName})`;

    conn.query(sql, (err, result) => {
      console.log(err, "sign up");

      if (err) {
        if (err.errno === 1062) {
          return res.send({ message: "User Already Exists" });
        }
        return res.sendStatus(500);
      }
      if (result) {
        return res.status(200).send({ message: "User Added" });
      }
    });
  } catch (e) {
    console.log(e, "err");
    return res.status(500).send({ message: "Server Error", data: e });
  }
};
