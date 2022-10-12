const express = require("express");

const PORT = 4444;
const app = express();

app.get("/", (req, res) => {
  res.send("Hello");
});

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log("server started");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
