const url = require("url");
const { Todo } = require("../db/config");

function handlePostReq(req, res) {
  const size = parseInt(req.headers["content-length"], 10);
  const buffer = Buffer.allocUnsafe(size);
  var pos = 0;

  const { pathname } = url.parse(req.url);
  if (pathname !== "/todos") {
    return handleError(res, 404);
  }

  req
    .on("data", (chunk) => {
      const offset = pos + chunk.length;
      if (offset > size) {
        reject(413, "Too Large", res);
        return;
      }
      chunk.copy(buffer, pos);
      pos = offset;
    })
    .on("end", async () => {
      if (pos !== size) {
        reject(400, "Bad Request", res);
        return;
      }
      const data = JSON.parse(buffer.toString());
      res.setHeader("Content-Type", "application/json;charset=utf-8");
      try {
        const newTodo = await Todo.create(data);
        await newTodo.save();
        res.end(JSON.stringify(newTodo));
      } catch (err) {
        res.statusCode = 400;
        res.end(JSON.stringify({ message: "Error loading data", err }));
      }
    });
}

module.exports = {
  handlePostReq,
};
