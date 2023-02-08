const http = require("http");
const { handleGetReq } = require("./controllers/getRequests");
const { handlePostReq } = require("./controllers/postRequests");
const { setupDB } = require("./db/config");

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    return handleGetReq(req, res);
  } else if (req.method === "POST") {
    return handlePostReq(req, res);
  }
});

function handleError(res, code) {
  res.statusCode = code;
  res.end(`{"error": "${http.STATUS_CODES[code]}"}`);
}

server.listen(port, async () => {
  try {
    await setupDB();
    console.log("Connected to db");
  } catch (err) {
    console.error("Couldn't connect to db", err);
  }
  console.log(`Server listening on port ${port}`);
});

module.exports = {
  handleError,
};
