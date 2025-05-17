const http = require("http");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  if (req.url == "/") {
    res.end(`<h2>Hello World</h2>`);
  } else if (req.url == "/pizza") {
    res.end(`<h2>This is your pizza</h2>`);
  } else if (req.url == "/home") {
    res.end(`<h2>Welcome Home</h2>`);
  } else if (req.url == "/about") {
    res.end(`<h2>Welcome to About Us</h2>`);
  } else if (req.url == "/node") {
    res.end(`<h2>Welcome to my Node Js project</h2>`);
  } else {
    res.end(`<h2>Page Not Found</h2>`);
  }
});

const port = 3000;

server.listen(port, () => {
  console.log("server is running");
});
