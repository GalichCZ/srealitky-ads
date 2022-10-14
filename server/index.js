const express = require("express");
const cors = require("cors");
const axios = require("axios");
const controller = require("./controller/ads.controller");
const db = require("./db");

const app = express();
app.use(express.json());
app.use(cors());
const items500 = [];

async function parse() {
  for (let i = 1; i < 26; i++) {
    axios
      .get(
        `https://www.sreality.cz/api/cs/v2/estates?category_main_cb=1&category_type_cb=1&page=${i}`
      )
      .then((data) =>
        data.data._embedded.estates.forEach((el) => {
          let obj = {};
          obj.title = el.name;
          obj.img = el._links.image_middle2[0].href;
          obj.url = `https://www.sreality.cz/detail/prodej/byt/${el.name.substring(
            12,
            15
          )}/${el.seo.locality}/${el.hash_id}`;
          obj.locality = el.locality;
          items500.push(obj);
        })
      );
  }
  console.log("parse done!");
}

const writeData = async () => {
  db.query("DELETE FROM ads");
  items500.forEach((el) => {
    controller.addAd(el.title, el.img, el.url, el.locality);
  });
  console.log("write data");
};

const connect = () => {
  db.query(
    "CREATE TABLE IF NOT EXISTS ads (id SERIAL PRIMARY KEY, title VARCHAR(255), img VARCHAR(255), url VARCHAR(255), locality VARCHAR(255))"
  ).catch((err) => console.log("PG ERROR", err));
};
const items = async () => {
  const rows = await db.query(`SELECT COUNT(id) FROM ads`);
  console.log(rows.rows[0].count);
  if (rows.rows[0].count <= 500) writeData();
};
setTimeout(() => {
  items();
}, 1000);

app.get("/", (req, res) => {
  res.send("hi");
});
app.get("/values", controller.getAdds);
app.get("/pages", controller.getPages);

const start = async () => {
  try {
    app.listen(5000, () => {
      console.log("server started on " + 5000);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
parse();
connect();
