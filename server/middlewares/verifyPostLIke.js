import { conn } from "../index.js";

export const verifyPostLike = (req, res, next) => {
  const { id: postId } = req.params;
  const { id: userId } = req.user;

  console.log(req.params, "params");

  //   const selectPostAuthorSql = `SELECT authorID FROM news WHERE ID = "${postId}"`;

  //   conn.query(selectPostAuthorSql, (err, result) => {
  //     console.log(result, "result");
  //     if (err) {
  //       return res.send({ success: false, data: err });
  //     }

  //     console.log(postId, "postID");

  //     if (!result.length) {
  //       return res.send({ success: false, message: "Post id is incorrect" });
  //     } else if (result[0].authorID === userId) {
  //       return res.send({
  //         success: false,
  //         message: "User is not allowed to like own posts.",
  //       });
  //     }

  next();
  //   });
};
