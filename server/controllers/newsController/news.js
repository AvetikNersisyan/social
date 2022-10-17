export const newsController = (req, res) => {
  res.send({
    data: [{ id: 1, title: "News 1" }],
  });
};
