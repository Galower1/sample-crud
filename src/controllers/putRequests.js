function handlePutReq(req, res) {
  const { pathname, query } = url.parse(req.url);
  if (pathname !== "/user") {
    return handleError(res, 404);
  }
  const { id } = qs.parse(query);
  const size = parseInt(req.headers["content-length"], 10);
  const buffer = Buffer.allocUnsafe(size);
  var pos = 0;
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
    .on("end", () => {
      if (pos !== size) {
        reject(400, "Bad Request", res);
        return;
      }
      const data = JSON.parse(buffer.toString());

      const userUpdated = Users.replaceUser(id, data);
      res.setHeader("Content-Type", "application/json;charset=utf-8");
      res.end(`{"userUpdated": ${userUpdated}}`);
    });
}
