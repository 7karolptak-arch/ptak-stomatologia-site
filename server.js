const http = require("http");
const fs = require("fs");
const path = require("path");
const root = __dirname;
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
};
http
  .createServer((req, res) => {
    let file = decodeURIComponent((req.url || "/").split("?")[0]);
    if (file === "/") file = "/index.html";
    const full = path.normalize(path.join(root, file));
    if (!full.startsWith(root)) {
      res.writeHead(403);
      res.end();
      return;
    }
    fs.readFile(full, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("Not found");
        return;
      }
      res.writeHead(200, { "Content-Type": types[path.extname(full)] || "application/octet-stream" });
      res.end(data);
    });
  })
  .listen(8767, "127.0.0.1", () => console.log("http://127.0.0.1:8767"));
