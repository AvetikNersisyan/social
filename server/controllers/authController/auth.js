import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { conn } from '../../index.js'
import { SALT_ROUNDS } from '../../routers/utils.js'


export const login = (req, res) => {
  const { username, password } = req.body;

  const sql = `SELECT ID, email, password FROM Users WHERE email="${username}"`;


  conn.query(sql, async (err, result) => {
    if (err) {
      return res.sendStatus(500);
    }

    if (result.length) {
      const isMatch = await bcrypt.compare(
        password,
        result[0].password
      );

      console.log(username, 'username')
      const id = result[0].ID;
      console.log(id, 'idik')
      if (isMatch) {
        const token = jwt.sign({ username, id: id }, "hello");

        return res.status(200).send({success: isMatch, token: token   })
      } else {
        return res.send({ message: 'Incorrect email/password'})
      }
    } else {
       return  res.send({ message: "No user found"})
    }
  });


  // res.send({ status: "ok", token: token });
};

export const signup = (req, res) => {
  const { username, password } = req.body;

  // if (!(username && password)) {
  //   return res
  //     .status(400)
  //     .send({ message: "Password and username are required" });
  // }


  const salt = bcrypt.genSaltSync(SALT_ROUNDS);
  try {
    const hashed = bcrypt.hashSync(password, salt);
    const sql = `INSERT INTO  Users (email, password) VALUES("${username}", "${hashed}")`;
    conn.query(sql, (err, result) => {
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
    return res.status(400).send({ message: "Password required" });
  }
};
