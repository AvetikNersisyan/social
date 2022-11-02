import { conn } from "../../index.js";

export const getNewsController = (req, res) => {

  console.log(req.body, 'body ');
  const sql = `SELECT news.id, users.name, users.email, users.surname, news.title, news.content FROM news JOIN users On users.ID = news.authorID  WHERE users.ID = '${req.user.id}' `

  conn.query(sql, (err, result) => {
    if(err) {
      return res.send({
        success: false,
        data: err,
      })
    }


    if(result) {
      res.send({
        data: result,
      });
    }
  })
 
};


export const publishNews = (req, res) => {
  const { title, content ,} = req.body;
  const { id : authorID} = req.user;

  if(!(title && content)) {
    return res.send({
      success: false,
      message: "title and content are required"
    })
  }

  const sql = `INSERT INTO news( title, content, authorID) VALUES ('${title}','${content}','${authorID}')`

  conn.query(sql, (err, result) => {
    if(err) {
      return res.send({
        success: false,
        data: err,
      })
    }

    if(result)  {
      return res.send({
        success: true,
        data: {
          id: result.insertId,
          title,
          content
        }
      })
    }
  })

}
