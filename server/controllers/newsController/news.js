export const getNewsController = (req, res) => {
  res.send({
    data: [{ id: 1, title: "News 1" }],
  });
};


export const publishNews = (req, res) => {
  const { title, content , author} = req.body;

  res.send({message: 'added'})
}
