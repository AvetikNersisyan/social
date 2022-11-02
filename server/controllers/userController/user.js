import { conn } from '../../index.js'

export  const getUser = (req, res) => {

  const sql = `SELECT users.name, users.surname, users.email FROM users WHERE ID = ${req.user.id}`;

      conn.query(sql, (err, result) => {
        if(err) {
          return  res.send({message: 'error', data: err})
        }

        if(result.length) {
           return  res.send({ data: result[0]})
        }

      })


}
