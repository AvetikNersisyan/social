import jwt from 'jsonwebtoken'
import { conn } from '../../index.js'

export  const getUser = (req, res) => {
    const { authorization } = req.headers;
      const token = authorization.split(' ')[1]

    const decoded = jwt.decode(token,  {complete: true})

  console.log(decoded, 'decoded')

  const sql = `SELECT users.name, users.surname, users.email FROM users WHERE ID = ${decoded.payload.id}`;

      conn.query(sql, (err, result) => {
        console.log(result, 'result in get user')
        if(err) {
          return  res.send({message: 'error', data: err})
        }

        if(result.length) {
           return  res.send({ data: result[0]})
        }

      })


}
