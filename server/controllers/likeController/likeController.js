import { escapeQuotes } from '../../helpers/utils.js'
import { conn } from "../../index.js";

export const likePost = (req, res) => {
  const { id: postId } = req.params;
  const { id: userId } = req.user;

  console.log(req.user)
  let isSent = false;

  const likeSql = `INSERT INTO postlikes (postId, userID) VALUES(${postId}, ${userId})`;
  const deleteSql = `DELETE FROM postlikes WHERE id = ?`;
  const selectLike = `SELECT * FROM postlikes WHERE postId = "${postId}" AND userID = "${userId}"`;
  const selectPostAuthorSql = `SELECT authorID FROM news WHERE ID = "${postId}"`;

  conn.query(selectPostAuthorSql, (err, result) => {
    if (err) {
      isSent = true;
      return res.send({ success: false, data: err });
    }

    if (!result.length) {
      isSent = true;
      return res.send({ success: false, message: "Post id is incorrect" });
    } else if (result[0].authorID === userId) {
      isSent = true;

      return res.send({
        success: false,
        message: "User is not allowed to like own posts.",
      });
    }

    return;
  });

  if (isSent) return;

  conn.query(selectLike, (err, result) => {
    if (isSent) {
      return;
    }
    if (err) {
      return res.send({ success: false, data: err });
    }
    if (result) {
      if (result.length) {
        conn.query(deleteSql, [result[0].id], (err, result) => {
          if (err) {
            return res.send({ success: false, data: err });
          }
          if (result) {
            return res.send({
              success: true,
              data: {
                liked: false,
                postId,
                userId,
              },
            });
          }
        });
      } else {
        conn.query(likeSql, (err, result) => {
          if (err) {
            return res.status(500).send({ success: false, message: err });
          }

          if (result) {
            return res.send({
              success: true,
              data: {
                liked: true,
                postId,
                userId,
              },
            });
          }
        });
      }
    }
  });
};
