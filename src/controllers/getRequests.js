const url = require("url");
const { Todo } = require("../db/config");

async function handleGetReq(req, res) {
  const { pathname } = url.parse(req.url);
  if (pathname !== "/todos") {
    return handleError(res, 404);
  }
  res.setHeader("Content-Type", "application/json;charset=utf-8");

  const todos = await Todo.findAll();

  return res.end(JSON.stringify(todos));
}

module.exports = {
  handleGetReq,
};
