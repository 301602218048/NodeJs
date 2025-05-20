const express = require("express");
const book = require("./routes/book");

const app = express();

app.use(express.json());
app.use("/books", book);

const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
