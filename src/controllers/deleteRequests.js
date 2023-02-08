function handleDeleteReq(req, res) {
  const { pathname, query } = url.parse(req.url);
  if (pathname !== "/user") {
    return handleError(res, 404);
  }
  const { id } = qs.parse(query);
  const userDeleted = Users.deleteUser(id);
  res.setHeader("Content-Type", "application/json;charset=utf-8");
  res.end(`{"userDeleted": ${userDeleted}}`);
}

module.exports = {
  handleDeleteReq,
};
