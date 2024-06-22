const http = require("http");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const url = req.url;

  if (url === "/about") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("Welcome to about us page");
    res.end();
  } else if (url === '/contact') {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write('Welcome to contact us page');
    res.end();
  } else if (url === '/') {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write('Hello World');
    res.end();
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write('404 Page Not Found');
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
