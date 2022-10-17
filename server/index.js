import express from "express";
import mysql from "mysql";

import authRoute from "./routers/routers.js";
import newsRoute from "./routers/privateRoutes.js";
const PORT = 8080;
const app = express();

const conn = mysql.createConnection({
  host: "localhost",
  password: "3hNc]oDdm47uc4ZA",
  user: "admin",
  database: "test",
});

conn.connect((err) => {
  if (err) console.log("errr117");
  console.log("connected to db");
});

app.listen(PORT, () => {
  console.log("app started on port :" + PORT);
});

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
  const sql = `INSERT INTO Users (email, password) VALUES("${username}", "${password}")`;

  conn.query(sql, (err, result) => {
    console.log(err, "errr");
    console.log(result, "result");
    if (err) {
      return res.status(500);
    }

    return res.send({ status: "added" });
  });
});
