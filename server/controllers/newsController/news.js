import { escapeQuotes } from '../../helpers/utils.js'
import { conn } from "../../index.js";

export const getNewsController = (req, res) => {
  const sql = `SELECT news.ID, users.email, news.title, news.content, news.authorID, users.name, users.surname,  GROUP_CONCAT(JSON_ARRAY(JSON_OBJECT('userid',postlikes.userID, 'name', users.name, 'surname', users.surname))) as likedBy FROM news JOIN users On users.ID = news.authorID LEFT JOIN postlikes On postlikes.postId = news.id GROUP BY news.ID`;

  conn.query(sql, (err, result) => {
    if (err) {
      return res.send({
        success: false,
        data: err,
      });
    }

    if (result) {
      const temp = result.map((item) => ({ ...item, isOwner: true }));
      res.send({
        data: temp,
      });
    }
  });
};

export const getFeedController = (req, res) => {
  const sql = `SELECT news.ID, users.email, news.title, news.content, news.authorID, users.name, users.surname,  GROUP_CONCAT(JSON_ARRAY(JSON_OBJECT('userid',postlikes.userID, 'name', users.name, 'surname', users.surname))) as likedBy FROM news JOIN users On users.ID = news.authorID LEFT JOIN postlikes On postlikes.postId = news.id GROUP BY news.ID`;

  conn.query(sql, (err, result) => {
    if (err) {
      return res.send({
        success: false,
        data: err,
      });
    }

    if (result) {
      const adaptedData = result.map((item) => {
        item.isOwner = item.authorID === req.user.id;
        console.log(item.likedBy, 'likedby')
        // const temp = JSON.parse(item.likedBy)
        item.likedBy = item.likedBy.filter(item =>  item.userid)
        return item
      });


      return res.send({
        success: true,
        data: adaptedData,
      });
    } else {
      return res.sendStatus(404);
    }
  });
};


export const updatePost = (req, res) => {
  const { id: postId } = req.params;
  const { id: userId } = req.user;
  const { title, content } = req.body;

  if (
    !(title || content) ||
    typeof title !== "string" ||
    typeof content !== "string"
  ) {
    return res.send({
      success: false,
      message: "send new title and content as text",
    });
  }

  const sql = `SELECT authorID FROM news WHERE ID = ${postId} AND authorID = ${userId}`;

  conn.query(sql, (err, result) => {
    if (err) {
      res.send({ success: false, message: "Post is not found", data: err });
      console.log(err, "err");
    }

    const createSqlUpdateQuery = (data = {}, table, postId) => {
      const copiedData = Object.assign({}, data);
      let query = `UPDATE ${table} SET `;
      for (const key in copiedData) {
        if (!copiedData[key]) {
          delete copiedData[key];
        } else {
          query += `${key} = \'${copiedData[key]}\',`;
        }
      }

      query = query.substring(0, query.length - 1) + ` WHERE ID = ${postId}`;

      return query;
    };

    if (result.length) {
      const updateQuery = createSqlUpdateQuery(
        { title, content },
        "news",
        postId
      );

      conn.query(updateQuery, (err, result) => {
        if (err) {
          return res.send({
            success: false,
            data: err,
          });
        }

        if (result) {
          return res.send({
            success: true,
            data: {
              ID: postId,
              title,
              content,
            },
          });
        }
      });
    } else {
      return res.send({
        success: false,
        data: "Not allowed to edit this post!",
      });
    }
  });

  // res.sendStatus(200)
};

export const publishNews = (req, res) => {
  const { title, content } = req.body;
  const { id: authorID } = req.user;

  if (!(title && content)) {
    return res.send({
      success: false,
      message: "title and content are required",
    });
  }


  const escapedTitle = escapeQuotes(title);
  const escapedContent = escapeQuotes(content);

  const sql = `INSERT INTO news( title, content, authorID) VALUES ('${escapedTitle}','${escapedContent}','${authorID}')`;

  conn.query(sql, (err, result) => {
    console.log(authorID);
    if (err) {
      return res.send({
        success: false,
        data: err,
      });
    }

    if (result) {
      return res.send({
        success: true,
        data: {
          id: result.insertId,
          title,
          content,
        },
      });
    }
  });
};
