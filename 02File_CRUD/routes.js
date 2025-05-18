const fs = require("fs");

const requestHandler = (req, res) => {
  res.setHeader("Content-Type", "text/html");

  if (req.url == "/") {
    fs.readFile("formValues.txt", (err, data) => {
      const savedData = data ? data.toString() : "No data yet";
      res.end(`
            <h2>${savedData}</h2>
            <form action="/message" method="POST">
              <label>Name: </label>
              <input type="text" name="username" />
              <button type="submit">Add</button>
            </form>
          `);
    });
  } else {
    if (req.url == "/message") {
      res.setHeader("Content-Type", "text/html");

      let buffer = [];
      req.on("data", (chunks) => {
        console.log(chunks);
        buffer.push(chunks);
      });

      req.on("end", () => {
        let combinedChunks = Buffer.concat(buffer);
        console.log(combinedChunks.toString());
        let value = combinedChunks.toString().split("=")[1];
        console.log(value);

        fs.writeFile("formValues.txt", value, (err) => {
          res.statusCode = 302; //redirected
          res.setHeader("Location", "/");
          res.end();
        });
      });
    }
  }
};

module.exports = { handler: requestHandler };
