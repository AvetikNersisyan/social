import express from "express";
import mysql from "mysql";
import cors from 'cors'

import authRoute from "./routers/publicRoutes.js";
import newsRoute from "./routers/privateRoutes.js";
const PORT = 8080;
const app = express();



export const conn = mysql.createConnection({
  host: "localhost",
  // password: "Ev5Jvc@HthIO7078",
  user: "admin",
  database: "test",
});

conn.connect((err) => {
  if (err) {
    return;
  }
});

app.listen(PORT, () => {
  console.log("app started on port :" + PORT);
});

app.use(cors())
app.use(express.json());
app.use("/auth", authRoute);
app.use("/", newsRoute);

app.get("/createUsersTable", (req, res) => {
  const sql = `CREATE TABLE Users (ID INT NOT NULL, name VARCHAR(255), surname VARCHAR(255), email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, PRIMARY KEY (ID))`;

  conn.query(sql, (err, result) => {
    if (err) console.log(err, "error creating table");

    return res.send({ status: "created", db: result });
  });
});

app.post("/addUser", (req, res) => {
  const { username, password } = req.body;
  const sql = `INSERT INTO users (email, password) VALUES("${username}", "${password}")`;



  conn.query(sql, (err, result) => {
    console.log(err, 'err');
    if (err) {
      return res.status(500);
    }

    return res.send({ status: "added" });
  });
});
